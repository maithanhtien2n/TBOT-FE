import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { API_APP as API } from "./api";
import { Utils } from "@/utils/response";

// Client
export * as STORE_HOME from "@/views/home/services/store";
export * as STORE_PERSONAL from "@/views/personal/services/store";
export * as STORE_APPLICATION from "@/views/application/services/store";
export * as STORE_MONEY_WALLET from "@/views/money-wallet/services/store";
export * as STORE_NOTIFICATION from "@/views/notification/services/store";

// Admin
export * as STORE_ACCOUNT_ADMIN from "@/admin-views/account/services/store";
export * as STORE_NOTIFICATION_ADMIN from "@/admin-views/notification-admin/services/store";
export * as STORE_TOP_UP_HISTORY_ADMIN from "@/admin-views/topup-history-admin/services/store";
export * as STORE_QUESTION_ADMIN from "@/admin-views/question-admin/services/store";
export * as STORE_DOCUMENT_ADMIN from "@/admin-views/document-admin/services/store";

export const StoreApp = defineStore("StoreApp", () => {
  // Các hàm khác
  const { onResponse } = Utils();

  // State
  const loading = ref({
    active: false,
    message: "",
  });
  const authentication = ref({
    email: "",
    otp: "",
  });
  const userInfo = ref({});

  // Getter
  const onGetterAuthentication = computed(() => authentication);
  const onGetterLoading = computed(() => loading);
  const onGetterUserInfo = computed(() => userInfo);

  // Action
  const onActionLoadingActive = (active, message = "Đang tải...") => {
    loading.value = { active, message };
  };

  // Đăng nhập
  const onActionLoginAccount = async (args) => {
    return await onResponse(API.onApiLoginAccount(args));
  };

  // Đăng ký
  const onActionRegisterAccount = async (args) => {
    return await onResponse(API.onApiRegisterAccount(args), true);
  };

  // Thông tin người dùng
  const onActionGetUserInfo = async (args) => {
    const res = await onResponse(API.onApiGetUserInfo(args));
    if (res.success) {
      userInfo.value = res?.data;
    }
    return res;
  };

  // Gửi mã otp qua mail cho người dùng
  const onActionSendMail = async (args) => {
    const res = await onResponse(API.sendMail(args), true);
    return res;
  };

  const onActionAuthOtp = async (args) => {
    const res = await onResponse(API.authOtp(args));
    if (res.success) {
      authentication.value = res.data;
    }
    return res;
  };

  return {
    // Getter
    onGetterAuthentication,
    onGetterLoading,
    onGetterUserInfo,

    // Action
    onActionLoadingActive,
    onActionLoginAccount,
    onActionRegisterAccount,
    onActionGetUserInfo,
    onActionSendMail,
    onActionAuthOtp,
  };
});
