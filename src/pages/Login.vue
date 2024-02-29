<script setup>
import * as Yup from "yup";
import { reactive } from "vue";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { appLocalStorage, onEncryptedData, isValidEmail } from "@/utils";
import { StoreApp } from "@/services/stores";
import { updateAuthorizationHeader } from "@/services/api";
import InputTextValidate from "@/components/validation/InputTextValidate.vue";
import TheFooter from "@/TheFooter.vue";

const ROUTER = useRouter();

const { onActionLoginAccount } = StoreApp();

const formData = reactive({
  email: "",
  password: "",
});

const schema = Yup.object({
  email: Yup.string()
    .test("email", "Email của bạn không hợp lệ", (v) => isValidEmail(v))
    .required("Vui lòng nhập email của bạn"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

const { values: infoData, handleSubmit } = useForm({
  initialValues: formData,
  validationSchema: schema,
  keepValuesOnUnmount: true,
});

const onSubmit = handleSubmit(async () => {
  const res = await onActionLoginAccount(infoData);

  if (res.success) {
    ROUTER.back();

    updateAuthorizationHeader(
      res?.data?.accessToken,
      res?.data?.userData?.account?._id
    );

    appLocalStorage.value.userData = onEncryptedData(res?.data?.userData);
    appLocalStorage.value.accessToken = res?.data?.accessToken;
  }
});
</script>
<template>
  <div
    class="h-screen flex flex-column justify-content-center align-items-center"
  >
    <div class="w-20rem flex flex-column gap-3">
      <InputTextValidate
        name="email"
        class="w-full"
        placeholder="Tên tài khoản"
        @keypress.enter="onSubmit"
      />

      <InputTextValidate
        name="password"
        type="password"
        class="w-full"
        placeholder="Mật khẩu"
        @keypress.enter="onSubmit"
      />

      <Button label="Đăng nhập" @click="onSubmit" />

      <div class="flex gap-3 align-items-center">
        <span class="flex-1 border-top-1 text-300" />
        <span class="text-700">hoặc</span>
        <span class="flex-1 border-top-1 text-300" />
      </div>

      <Button
        label="Tạo tài khoản"
        class="w-full"
        outlined
        @click="ROUTER.replace({ name: 'OtpAuthentication' })"
      />
    </div>
  </div>

  <TheFooter />
</template>
