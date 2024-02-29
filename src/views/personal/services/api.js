import { AxiosInstance } from "@/services/api";

class ApiPersonal {
  getUserInfo = async (noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `user/detail`,
      noLoading,
    });
  };

  saveUserInfo = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `user/save`,
      data: args,
    });
  };
}

export const API_PERSONAL = new ApiPersonal();
