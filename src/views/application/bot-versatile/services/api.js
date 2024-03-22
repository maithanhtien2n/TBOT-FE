import { AxiosInstance } from "@/services/api";

class ApiBotVersatile {
  getVersatile = async (id) => {
    return await AxiosInstance({
      method: "PUT",
      url: `common/bot-versatile-detail`,
      params: { id },
    });
  };

  sendMessage = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: `bot-versatile/send-message`,
      data: args,
      noLoading: true,
    });
  };
}

export const API_BOT_VERSATILE = new ApiBotVersatile();
