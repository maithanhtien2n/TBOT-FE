import { AxiosInstance } from "@/services/api";

class ApiApplicationAdmin {
  getListBotVersatile = async (args, noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `bot-versatile`,
      params: args,
      noLoading,
    });
  };

  saveBotVersatile = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `bot-versatile`,
      params: { id: args?._id || null },
      data: args,
    });
  };

  updateStatusBotVersatile = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `bot-versatile/update-status`,
      data: args,
    });
  };
}

export const API_APPLICATION_ADMIN = new ApiApplicationAdmin();
