import { AxiosInstance } from "@/services/api";

class ApiNotification {
  getListNotification = async (noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `notification/user`,
      noLoading,
    });
  };

  getNotificationInfo = async (params) => {
    return await AxiosInstance({
      method: "GET",
      url: `notification/detail/${params}`,
    });
  };
}

export const API_NOTIFICATION = new ApiNotification();
