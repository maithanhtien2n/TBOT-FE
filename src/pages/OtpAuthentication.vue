<script setup>
import { StoreApp } from "@/services/stores";
import { reactive, ref, watch } from "vue";
import { isValidEmail } from "@/utils";
import { useRouter } from "vue-router";
import TheFooter from "@/TheFooter.vue";

const ROUTER = useRouter();

const { onActionSendMail, onActionAuthOtp } = StoreApp();

const formData = reactive({
  email: "",
  otp: "",
});
const formError = reactive({
  email: "",
  otp: "",
});
const statusSendMail = ref("");

const onChangeEmail = (event) => {
  const value = event.target.value;
  if (!value) {
    formError.email = "Vui lòng nhập email của bạn";
  } else if (!isValidEmail(value)) {
    formError.email = "Email của bạn không hợp lệ";
  } else {
    formError.email = "";
  }
};

const onInputOtp = () => {
  if (formData.otp.length > 4) {
    formData.otp = formData.otp.slice(0, 4);
  }
};

const onClickSendMail = async () => {
  statusSendMail.value = "SENDING";

  const res = await onActionSendMail({ email: formData.email });
  if (res.success) {
    statusSendMail.value = "SENT_SUCCESS";
  } else {
    statusSendMail.value = "SENT_ERROR";
  }
};

const onClickAccuracy = async () => {
  const res = await onActionAuthOtp({
    otp: formData.otp,
    email: formData.email,
  });

  if (res.success) {
    ROUTER.push({ name: "Register" });
  }
};

watch(
  () => formData.email,
  () => {
    statusSendMail.value = "";
  }
);
</script>

<template>
  <div
    class="h-screen flex flex-column justify-content-center align-items-center"
  >
    <div class="w-20rem flex flex-column gap-3">
      <div class="flex flex-column gap-1">
        <div class="flex gap-2 align-items-center">
          <InputText
            v-model="formData.email"
            placeholder="Nhập email của bạn"
            class="w-full"
            @blur="onChangeEmail"
            @input="onChangeEmail"
          />
          <Button
            v-show="formData.email && !formError.email && !statusSendMail"
            icon="pi pi-arrow-right"
            @click="onClickSendMail"
          />
          <i
            v-show="statusSendMail === 'SENDING'"
            class="pi pi-spin pi-spinner"
          />
          <i
            v-show="statusSendMail === 'SENT_SUCCESS'"
            style="color: #10b981"
            class="pi pi-check"
          />
          <i
            v-show="statusSendMail === 'SENT_ERROR'"
            style="color: rgb(228, 54, 54)"
            class="pi pi-times on-click"
          />
        </div>
        <small v-show="formError.email" class="p-error">
          {{ formError.email }}
        </small>
      </div>

      <div
        :class="[
          'flex flex-column gap-1',
          { 'p-disabled': statusSendMail !== 'SENT_SUCCESS' },
        ]"
      >
        <div class="flex gap-2">
          <InputOtp v-model="formData.otp" @input="onInputOtp" />
          <Button
            label="Xác thực"
            :class="['flex-1', { 'p-disabled': formData.otp.length !== 4 }]"
            @click="onClickAccuracy"
          />
        </div>
        <small v-show="formError.otp" class="p-error">
          {{ formError.otp }}
        </small>
      </div>

      <div class="flex gap-3 align-items-center">
        <span class="flex-1 border-top-1 text-300" />
        <span class="text-700">hoặc</span>
        <span class="flex-1 border-top-1 text-300" />
      </div>

      <Button
        label="Bạn đã có tài khoản?"
        class="w-full"
        outlined
        @click="ROUTER.replace({ name: 'Login' })"
      />
    </div>
  </div>

  <TheFooter />
</template>
