import { AxiosInstance } from "@/services/api";

class ApiHome {
  getDocument = async (noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `document`,
      noLoading,
    });
  };

  getListQuestion = async (scope, noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `question/user`,
      params: { scope },
      noLoading,
    });
  };

  sendContent = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: `question`,
      data: args,
      noLoading: true,
    });
  };
}

export const API_HOME = new ApiHome();
