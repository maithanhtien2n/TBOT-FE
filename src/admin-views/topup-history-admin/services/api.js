import { AxiosInstance } from "@/services/api";

class ApiTopUpHistoryAdmin {
  getTopUpHistory = async (keySearch = "", noLoading = false) => {
    return await AxiosInstance({
      method: "PUT",
      url: `user/topup-history?keySearch=${keySearch}`,
      noLoading,
    });
  };
}

export const API_TOP_UP_HISTORY_ADMIN = new ApiTopUpHistoryAdmin();
