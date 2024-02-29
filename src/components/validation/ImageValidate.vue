<script setup>
import { useField } from "vee-validate";
import { ref } from "vue";

const props = defineProps({
  name: { type: String, required: true, default: "" },
  label: { type: String, required: false, default: "" },
  class: { type: String, required: false, default: "w-12rem h-12rem" },
  style: { type: Object, required: false, default: () => {} },
  disabled: { type: Boolean, required: false, default: false },
  miniSize: { type: Boolean, required: false, default: false },
  required: { type: Boolean, required: false, default: true },
  imageProps: {
    type: Object,
    required: false,
    default: () => {
      return {
        maxSize: 100,
        accept: "image/*",
        type: "JPG,JPEG,PNG",
      };
    },
  },
});

const emits = defineEmits(["onUpload", "onRemove"]);

const { value, errorMessage, setErrors, setValue } = useField(props.name);

const isLoading = ref(false);

const convertByteToMB = (byteSize) => {
  const mbSize = byteSize / 1048576; // 1048576 = 1MB
  return Number(mbSize % 1 === 0 ? mbSize.toFixed(0) : mbSize.toFixed(2));
};

const onCheckFileUpload = (event) => {
  // Check size file image upload
  if (
    convertByteToMB(event.target.files[0].size) >
    Number(props?.imageProps?.maxSize)
  ) {
    setErrors(
      `Dung lượng tệp không được vượt quá ${props?.imageProps?.maxSize}MB`
    );
    return true;
  }

  // Check type file image upload
  if (
    !props.imageProps.type
      .toLowerCase()
      .split(",")
      .includes(
        event.target.files[0].name
          .split(".")
          [event.target.files[0].name.split(".").length - 1].toLowerCase()
      )
  ) {
    setErrors(`Tệp không đúng định dạng`);
    return true;
  }
};

const onUpload = async (event) => {
  if (onCheckFileUpload(event)) return;

  isLoading.value = true;

  const reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (e) => {
    if (e.target.result) {
      setValue({
        name: event.target.files[0].name,
        base64: e.target.result,
      });
    } else {
      //
    }
    isLoading.value = false;
  };

  emits("onUpload", event);
};

const onDropPrevent = async (event) => {
  const value = {
    target: {
      files: [event.dataTransfer.files[0]],
    },
  };
  event.preventDefault();
  onUpload(value);
};

const onReturnFileName = (v) => {
  switch (v) {
    case "image/*":
      return "ảnh";
    case "video/*":
      return "video";
    default:
      return "file";
  }
};

const onRemove = (v) => {
  setValue(null);
  emits("onRemove", v);
};
</script>

<template>
  <div :class="['flex flex-column gap-2', props.class]">
    <label v-show="props.label">
      <span>{{ props.label }}</span>
      <span v-show="props.required" class="p-error"> *</span>
    </label>

    <div class="flex flex-column gap-1">
      <div
        :class="{ 'p-disabled': props.disabled }"
        class="border-1 border-dashed text-main-color border-round-lg overflow-hidden"
      >
        <!-- Nút upload -->
        <div
          v-if="!value && !isLoading"
          :class="[
            props.class,
            'relative flex align-items-center justify-content-center',
          ]"
        >
          <i v-if="props.miniSize" class="pi pi-plus" />

          <div v-else class="flex flex-column gap-1 align-items-center">
            <i class="pi pi-camera text-2xl" />
            <span>
              {{ `Thêm ${onReturnFileName(props.imageProps.accept)}` }}
            </span>
          </div>

          <input
            type="file"
            class="absolute top-0 right-0 left-0 bottom-0 opacity-0 on-click"
            :accept="props.imageProps.accept"
            @drop.prevent="onDropPrevent"
            @change="onUpload"
          />
        </div>

        <div
          v-if="isLoading && !value"
          :class="[
            props.class,
            'relative flex justify-content-center align-items-center',
          ]"
        >
          <div class="flex flex-column gap-1">
            <ProgressSpinner
              style="width: 40px; height: 40px"
              strokeWidth="3"
              animationDuration=".5s"
            />
            <span>Đang tải...</span>
          </div>
        </div>

        <!-- Xem trước -->
        <div
          v-if="value && !isLoading"
          :class="[props.class, 'relative']"
          :style="props.style"
        >
          <i
            style="background-color: rgba(240, 248, 255, 0.767)"
            class="pi pi-times absolute right-0 p-1 border-round-lg on-click z-5"
            @click="onRemove(value)"
          />

          <img
            v-if="props.imageProps.accept === 'image/*'"
            style="object-fit: contain"
            class="w-full h-full"
            :src="value.base64"
            alt="Lỗi ảnh"
          />

          <video
            v-if="props.imageProps.accept === 'video/*'"
            class="w-full h-full"
            controls
          >
            <source :src="value.base64" type="video/mp4" />
          </video>

          <div
            v-if="props.imageProps.accept === '.rar'"
            class="w-full h-full flex align-items-center justify-content-center"
          >
            <div class="flex flex-column">
              <img
                class="w-10rem h-10rem object-fit-cover"
                src="https://cdn1.iconfinder.com/data/icons/fs-icons-ubuntu-by-franksouza-/512/application-x-rar.png"
                alt="Lỗi ảnh"
              />
              <span>{{ value?.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <small class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>
