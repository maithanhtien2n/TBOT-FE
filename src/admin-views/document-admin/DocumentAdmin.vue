<script setup>
import * as Yup from "yup";
import { useForm, useField } from "vee-validate";
import IconTitle from "@/components/common/IconTitle.vue";
import { STORE_DOCUMENT_ADMIN } from "@/services/stores";
import { onMounted, reactive, watch } from "vue";
import InputTextValidate from "@/components/validation/InputTextValidate.vue";

const { onGetterDocument, onActionGetDocument, onActionSaveDocument } =
  STORE_DOCUMENT_ADMIN.StoreDocumentAdmin();

const formData = reactive({
  documentId: onGetterDocument.value?._id,
  application: {
    video: "",
    content: "",
  },
  topUp: "",
});

const schema = Yup.object({
  application: Yup.object({
    video: Yup.string().required("Vui lòng nhập đường dẫn video"),
    content: Yup.string().required("Vui lòng nhập nội dung"),
  }),
  topUp: Yup.string().required("Vui lòng nhập nội dung"),
});

const {
  values: infoData,
  resetForm,
  handleSubmit,
} = useForm({
  initialValues: formData,
  validationSchema: schema,
  keepValuesOnUnmount: true,
});

const { value: applicationContent, errorMessage: errApplicationContent } =
  useField("application.content");

const { value: topUp, errorMessage: errTopUp } = useField("topUp");

const onSubmit = handleSubmit(async () => {
  const res = await onActionSaveDocument(infoData);
  if (res.success) {
    onActionGetDocument(true);
  }
});

watch(onGetterDocument, (newValue) => {
  resetForm({ values: Object.assign(formData, newValue) });
});

onMounted(() => {
  onActionGetDocument();
});
</script>

<template>
  <div class="flex h-full flex-column gap-3">
    <IconTitle icon="pi pi-book" title="Tài liệu ứng dụng" />

    <div class="card h-full flex gap-3 flex-wrap">
      <div style="min-width: 10rem" class="flex flex-1 flex-column gap-3">
        <div class="flex justify-content-between align-items-end">
          <span>Ứng dụng:</span>
          <Button label="Lưu tài liệu" class="opacity-0 p-disabled" />
        </div>

        <InputTextValidate
          name="application.video"
          class="w-full"
          placeholder="Đường dẫn video youtube..."
        />

        <div class="flex flex-column gap-1">
          <Editor v-model="applicationContent" editorStyle="height: 215px" />
          <small v-show="errApplicationContent" class="p-error">
            {{ errApplicationContent }}
          </small>
        </div>
      </div>

      <div />

      <div style="min-width: 10rem" class="flex flex-1 flex-column gap-3">
        <div class="flex justify-content-between align-items-end">
          <span>Nạp tiền:</span>
          <Button label="Lưu tài liệu" @click="onSubmit" />
        </div>

        <div class="flex flex-column gap-1">
          <Editor v-model="topUp" editorStyle="height: 273px" />
          <small v-show="errTopUp" class="p-error">
            {{ errTopUp }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>
