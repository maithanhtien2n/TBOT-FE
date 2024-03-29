import { AxiosInstance } from "@/services/api";

class ApiAccountAdmin {
  getListUser = async (args, noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `user`,
      params: args,
      noLoading,
    });
  };

  getUserInfo = async (params, noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `user/${params}`,
      noLoading,
    });
  };

  updateMoneyBalanceUser = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `user/topup`,
      data: args,
    });
  };

  updateStatusUer = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `user/update-status`,
      data: args,
    });
  };

  deleteAccount = async (ids) => {
    return await AxiosInstance({
      method: "DELETE",
      url: `user`,
      params: { ids: [...ids] },
    });
  };
}

export const API_ACCOUNT_ADMIN = new ApiAccountAdmin();
