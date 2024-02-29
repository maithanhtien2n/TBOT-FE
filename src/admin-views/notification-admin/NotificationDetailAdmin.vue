<script setup>
import * as Yup from "yup";
import { socket } from "@/utils";
import { useForm, useField } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import IconTitle from "@/components/common/IconTitle.vue";
import { computed, onMounted, reactive, watch } from "vue";
import { STORE_NOTIFICATION_ADMIN } from "@/services/stores";
import ImageValidate from "@/components/validation/ImageValidate.vue";
import DropdownValidate from "@/components/validation/DropdownValidate.vue";
import InputTextValidate from "@/components/validation/InputTextValidate.vue";

const ROUTE = useRoute();
const ROUTER = useRouter();

const {
  onGetterNotificationInfo: notificationInfo,
  onActionGetNotificationInfo,
  onActionSaveNotificationInfo,
} = STORE_NOTIFICATION_ADMIN.StoreNotificationAdmin();

const sendType = computed(() => ROUTE.query.sendType);

const formData = reactive({
  sendType: sendType.value,
  image: null,
  title: "",
  content: null,
});

const notificationId = computed(() =>
  ROUTE.params.id === "create" ? null : ROUTE.params.id
);

const schema = Yup.object({
  sendType: Yup.string().required("Vui lòng chọn đối tượng gửi"),
  image: Yup.object().required("Vui lòng chọn ảnh"),
  title: Yup.string().required("Vui lòng nhập tiêu đề"),
  content: Yup.string().required("Vui lòng nhập nội dung"),
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

const onClickBack = () => {
  ROUTER.replace({ name: "NotificationAdmin" });
};

const onSubmit = handleSubmit(async () => {
  onActionSaveNotificationInfo(notificationId.value, infoData).then((res) => {
    if (res.success) {
      ROUTER.replace({
        name: "NotificationDetailAdmin",
        params: { id: res.data._id },
      });

      socket.emit("isNewData", "Dữ liệu mới");
    }
  });
});

watch(notificationInfo, (newValue) => {
  resetForm({ values: Object.assign(formData, newValue) });

  if (newValue.image) {
    setFieldValue("image", {
      name: newValue?.image.split("$")[1],
      base64: newValue?.image,
    });
  }
});

onMounted(() => {
  if (notificationId.value) {
    onActionGetNotificationInfo(notificationId.value);
  }
});
</script>

<template>
  <div class="flex h-full flex-column gap-3">
    <IconTitle icon="pi pi-bell" title="Chi tiết thông báo" />

    <div class="card flex-1 flex flex-column gap-3">
      <div class="flex justify-content-between">
        <div class="flex gap-1 on-click" @click="onClickBack">
          <i class="pi pi-angle-left" />
          <span>Trở lại</span>
        </div>

        <div class="flex gap-2">
          <Button label="Hủy bỏ" outlined @click="onClickBack" />
          <Button label="Lưu" @click="onSubmit" />
        </div>
      </div>

      <div class="flex gap-3">
        <div style="width: 40%" class="flex gap-3">
          <ImageValidate
            label="Ảnh thông báo"
            name="image"
            class="image w-10rem h-10rem"
          />

          <div class="flex w-full flex-column gap-3">
            <InputTextValidate label="Tiêu đề" name="title" class="w-full" />

            <DropdownValidate
              label="Đối tượng"
              name="sendType"
              :options="[
                { name: 'Mọi người', code: 'EVERY_BODY' },
                { name: 'Cá nhân', code: 'PERSONAL' },
                { name: 'Đã từng nạp', code: 'JOINED' },
              ]"
              :disabled="!['ALL'].includes(sendType)"
            />
          </div>
        </div>

        <!-- Nội dung -->
        <div style="width: 60%" class="flex flex-column gap-2">
          <span>Nội dung <span class="p-error">*</span></span>
          <div class="flex flex-column gap-1">
            <Editor v-model="content" editorStyle="height: 270px" />
            <small v-show="errContent" class="p-error">{{ errContent }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
