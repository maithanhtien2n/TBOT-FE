<script setup>
import * as Yup from "yup";
import { reactive, onMounted } from "vue";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { StoreApp } from "@/services/stores";
import { isValidEmail, onValidPassword } from "@/utils";
import InputTextValidate from "@/components/validation/InputTextValidate.vue";
import TheFooter from "@/TheFooter.vue";

const ROUTER = useRouter();

const { onGetterAuthentication: auth, onActionRegisterAccount } = StoreApp();

const formData = reactive({
  otp: auth.value.otp,
  email: auth.value.email,
  password: "",
  passwordConfirm: "",
});

const schema = Yup.object({
  email: Yup.string()
    .test("email", "Email của bạn không hợp lệ", (v) => isValidEmail(v))
    .required("Vui lòng nhập email của bạn"),
  password: Yup.string()
    .test(
      "password",
      "Phải có ít nhất 6 ký tự, gồm số và ký tự đặc biệt",
      (v) => onValidPassword(v)
    )
    .required("Vui lòng nhập mật khẩu"),
  passwordConfirm: Yup.string()
    .when("password", (v, schema, { value }) => {
      return schema.test(
        "",
        "Mật khẩu xác nhận không khớp",
        () => v[0] === value
      );
    })
    .required("Vui lòng nhập mật khẩu xác nhận"),
});

const { values: infoData, handleSubmit } = useForm({
  initialValues: formData,
  validationSchema: schema,
  keepValuesOnUnmount: true,
});

const onSubmit = handleSubmit(async () => {
  const res = await onActionRegisterAccount(infoData);
  if (res.success) ROUTER.replace({ name: "Home" });
});

onMounted(() => {
  if (!auth.value.otp || !auth.value.email) {
    ROUTER.push({ name: "OtpAuthentication" });
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
        placeholder="Nhập email của bạn"
        :disabled="true"
        @keypress.enter="onSubmit"
      />

      <InputTextValidate
        name="password"
        type="password"
        class="w-full"
        placeholder="Mật khẩu"
        @keypress.enter="onSubmit"
      />

      <InputTextValidate
        name="passwordConfirm"
        type="password"
        class="w-full"
        placeholder="Mật khẩu xác nhận"
        @keypress.enter="onSubmit"
      />

      <Button label="Đăng ký" @click="onSubmit" />
    </div>
  </div>

  <TheFooter />
</template>
