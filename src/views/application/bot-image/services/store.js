import { defineStore } from "pinia";
import { API_BOT_IMAGE } from "../services/api";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";

export const StoreBotImage = defineStore("StoreBotImage", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_BOT_IMAGE;

  // State
  const messages = ref([]);

  // Getter
  const onGetterMessages = computed(() => messages);

  // Action
  const onActionCreateImage = async (args) => {
    const res = await onResponse(API.createImage(args));

    return res;
  };

  return {
    // Getter
    onGetterMessages,

    // Action
    onActionCreateImage,
  };
});
