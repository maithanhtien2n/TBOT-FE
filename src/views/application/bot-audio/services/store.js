import { defineStore } from "pinia";
import { API_BOT_AUDIO } from "../services/api";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";

export const StoreBotAudio = defineStore("StoreBotAudio", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_BOT_AUDIO;

  // State
  const messages = ref([]);

  // Getter
  const onGetterMessages = computed(() => messages);

  // Action
  const onActionCreateAudio = async (args) => {
    const res = await onResponse(API.createAudio(args));

    return res;
  };

  return {
    // Getter
    onGetterMessages,

    // Action
    onActionCreateAudio,
  };
});
