import { AxiosInstance } from "@/services/api";

export * as API_VIRTUAL_ASSISTANT from "../virtual-assistant/services/api";
export * as API_BOT_IMAGE from "../bot-image/services/api";
export * as API_BOT_AUDIO from "../bot-audio/services/api";
export * as API_BOT_VERSATILE from "../bot-versatile/services/api";

class ApiApplication {
  getListBotVersatile = async () => {
    return await AxiosInstance({
      method: "PUT",
      url: "common/bot-versatile",
    });
  };

  changeModel = async (isUpgrade) => {
    return await AxiosInstance({
      method: "PUT",
      url: "user/change-model",
      params: { isUpgrade },
    });
  };
}

export const API_APPLICATION = new ApiApplication();
