import { AxiosInstance } from "@/services/api";

class ApiBotAudio {
  createAudio = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: `bot-audio`,
      data: args,
      noLoading: true,
    });
  };
}

export const API_BOT_AUDIO = new ApiBotAudio();
