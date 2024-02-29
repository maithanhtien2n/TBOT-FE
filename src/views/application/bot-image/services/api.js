import { AxiosInstance } from "@/services/api";

class ApiBotImage {
  createImage = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: `bot-image`,
      data: args,
      noLoading: true,
    });
  };
}

export const API_BOT_IMAGE = new ApiBotImage();
