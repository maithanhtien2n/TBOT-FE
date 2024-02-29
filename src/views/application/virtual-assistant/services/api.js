import { AxiosInstance } from "@/services/api";

class ApiVirtualAssistant {
  getVirtualAssistant = async (noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `virtual-assistant/train`,
      noLoading,
    });
  };

  saveVirtualAssistant = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: `virtual-assistant/train`,
      data: args,
    });
  };

  chat = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: `virtual-assistant/chat`,
      data: args,
      noLoading: true,
    });
  };

  checkLinkChat = async (param) => {
    return await AxiosInstance({
      method: "GET",
      url: `virtual-assistant/check-link-chat/${param}`,
    });
  };

  createThread = async () => {
    return await AxiosInstance({
      method: "POST",
      url: `virtual-assistant/chat-container`,
      noLoading: true,
    });
  };

  getThread = async (threadId) => {
    return await AxiosInstance({
      method: "GET",
      url: `virtual-assistant/chat-container/${threadId}`,
      noLoading: true,
    });
  };
}

export const API_VIRTUAL_ASSISTANT = new ApiVirtualAssistant();
