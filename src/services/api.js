import axios from "axios";
import { StoreApp } from "./stores";
import router from "@/services/router";
import { accessToken, accountId, onDeleteAppLocalStorage } from "@/utils";

// Client
export * as API_HOME from "@/views/home/services/api";
export * as API_PERSONAL from "@/views/personal/services/api";
export * as API_APPLICATION from "@/views/application/services/api";
export * as API_MONEY_WALLET from "@/views/money-wallet/services/api";
export * as API_NOTIFICATION from "@/views/notification/services/api";

// Admin
export * as API_ACCOUNT_ADMIN from "@/admin-views/account/services/api";
export * as API_NOTIFICATION_ADMIN from "@/admin-views/notification-admin/services/api";
export * as API_TOP_UP_HISTORY_ADMIN from "@/admin-views/topup-history-admin/services/api";
export * as API_QUESTION_ADMIN from "@/admin-views/question-admin/services/api";
export * as API_DOCUMENT_ADMIN from "@/admin-views/document-admin/services/api";

class ApiApp {
  onApiLoginAccount = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "auth/login",
      data: {
        email: args?.email || null,
        password: args?.password || null,
      },
    });
  };

  onApiRegisterAccount = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "auth/register",
      data: {
        otp: args?.otp || null,
        email: args?.email || null,
        password: args?.password || null,
      },
    });
  };

  onApiGetUserInfo = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "user",
      // noLoading: true,
    });
  };

  sendMail = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "auth/otp-send",
      data: args,
      noLoading: true,
    });
  };

  authOtp = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "auth/otp-authentication",
      data: args,
    });
  };
}

export const API_APP = new ApiApp();

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

const updateAuthorizationHeader = (token, accountId) => {
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    AxiosInstance.defaults.headers.common["AccountId"] = accountId;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
    delete AxiosInstance.defaults.headers.common["AccountId"];
  }
};

updateAuthorizationHeader(accessToken?.value, accountId?.value);

AxiosInstance.interceptors.request.use((config) => {
  if (!config?.noLoading) StoreApp().onActionLoadingActive(true);
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    StoreApp().onActionLoadingActive(false);
    return response;
  },
  (error) => {
    if (
      [
        "LOGIN_REQUEST",
        "LOGIN_EXPIRED",
        "AUTH_FAILED",
        "ACCOUNT_IS_LOCKED",
        "ACCOUNT_REQUIRED",
        "ACCESS_IS_NOT_ALLOWED",
      ].includes(error.response.data.statusCode)
    ) {
      onDeleteAppLocalStorage();
    }

    if (["ERROR_BALANCE"].includes(error.response.data.statusCode)) {
      router.replace({ name: "RequiredTopUp" });
    }

    window.scrollTo(0, 0);
    StoreApp().onActionLoadingActive(false);
    return Promise.reject(error);
  }
);

export { AxiosInstance, updateAuthorizationHeader };
