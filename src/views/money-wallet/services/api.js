import { AxiosInstance } from "@/services/api";

class ApiMoneyWallet {
  getTopUpHistory = async (noLoading = false) => {
    return await AxiosInstance({
      method: "PUT",
      url: `user/topup-history`,
      noLoading,
    });
  };
}

export const API_MONEY_WALLET = new ApiMoneyWallet();
