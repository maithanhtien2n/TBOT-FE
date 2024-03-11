<script setup>
import * as Yup from "yup";
import { useField, useForm } from "vee-validate";
import { reactive, ref, watch } from "vue";
import ImageValidate from "@/components/validation/ImageValidate.vue";
import InputTextValidate from "@/components/validation/InputTextValidate.vue";

const props = defineProps({
  value: { type: Object, required: false, default: null },
});

const emits = defineEmits(["onOpen", "onCancel", "onSave"]);

const isOpenDialog = ref(false);

const formData = reactive({
  image: null,
  name: "",
  content: "",
  message: "",
  placeholder: "",
});

const schema = Yup.object({
  image: Yup.object().required("Vui lòng nhập ảnh"),
  name: Yup.string().required("Vui lòng nhập tên ứng dụng"),
  content: Yup.string().required("Vui lòng nhập nội dung đào tạo"),
  message: Yup.string().required("Vui lòng nhập thông điệp"),
  placeholder: Yup.string().required("Vui lòng nhập gợi ý nhập"),
});

const {
  values: infoData,
  resetForm,
  setFieldValue,
  handleSubmit,
} = useForm({
  initialValues: formData,
  validationSchema: schema,
  keepValuesOnUnmount: true,
});

const { value: content, errorMessage: errContent } = useField("content");

const onSubmit = handleSubmit(async () => {
  emits("onSave", infoData);
  isOpenDialog.value = false;
});

const onClickAddDraft = () => {
  emits("onOpen");
  isOpenDialog.value = true;
};

watch(
  () => props.value,
  (value) => {
    if (value) isOpenDialog.value = true;
    else isOpenDialog.value = false;
  }
);

watch(isOpenDialog, (isOpenDialog) => {
  if (!isOpenDialog) {
    emits("onCancel");
  } else {
    const value = props.value;
    if (value) {
      resetForm({ values: value, errors: null });
      if (value.image) {
        setFieldValue("image", {
          name: value?.image.split("$")[1],
          base64: value?.image,
        });
      }
    } else {
      resetForm({ values: {}, errors: null });
    }
  }
});
</script>

<template>
  <Button label="Thêm bản dự thảo" @click="onClickAddDraft" />

  <Dialog v-model:visible="isOpenDialog" modal class="w-30rem">
    <template #header>
      <div v-if="value" class="flex align-items-center gap-2">
        <span class="text-2xl">{{ value?.name }}</span>
        <div>
          <StatusComponent :code="value?.status" />
        </div>
      </div>

      <div v-else class="text-2xl">Thêm bản dự thảo</div>
    </template>

    <div class="flex flex-column gap-3">
      <ImageValidate label="Ảnh" name="image" class="image w-7rem h-7rem" />

      <InputTextValidate label="Tên ứng dụng" name="name" class="w-full" />

      <InputTextValidate label="Thông diệp" name="message" class="w-full" />

      <InputTextValidate label="Gợi ý nhập" name="placeholder" class="w-full" />

      <div class="flex flex-column gap-2">
        <span>Nội dung</span>
        <div class="flex flex-column gap-1">
          <Textarea v-model="content" rows="3" class="w-full line-height-2" />
          <small v-show="errContent" class="p-error">
            {{ errContent }}
          </small>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-content-end gap-2">
        <Button
          type="button"
          label="Hủy bỏ"
          severity="secondary"
          @click="isOpenDialog = false"
        />
        <Button type="button" label="Hoàn thành" @click="onSubmit" />
      </div>
    </template>
  </Dialog>
</template>
