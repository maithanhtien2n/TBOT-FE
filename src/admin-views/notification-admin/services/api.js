import { AxiosInstance } from "@/services/api";

class ApiNotificationAdmin {
  getListNotification = async (args, noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `notification/admin`,
      params: args,
      noLoading,
    });
  };

  getNotificationInfo = async (params, noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `notification/detail/${params}`,
      noLoading,
    });
  };

  saveNotificationInfo = async (params, args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `notification?notificationId=${params}`,
      data: args,
    });
  };

  updateStatusNotification = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `notification/update-status`,
      data: args,
    });
  };

  addNotificationTopUp = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `notification/topup`,
      data: args,
      noLoading: true,
    });
  };
}

export const API_NOTIFICATION_ADMIN = new ApiNotificationAdmin();
