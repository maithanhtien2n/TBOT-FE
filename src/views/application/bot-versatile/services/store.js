import { defineStore } from "pinia";
import { API_APPLICATION } from "@/services/api";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";

export const StoreBotVersatile = defineStore("StoreBotVersatile", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_APPLICATION.API_BOT_VERSATILE.API_BOT_VERSATILE;

  // State
  const botVersatile = ref({});
  const messages = ref([]);

  // Getter
  const onGetterBotVersatile = computed(() => botVersatile);
  const onGetterMessages = computed(() => messages);

  // Action
  const onActionGetVersatile = async (params) => {
    const res = await onResponse(API.getVersatile(params));
    botVersatile.value = res.data;
    return res;
  };

  const onActionSendMessage = async (args) => {
    const res = await onResponse(API.sendMessage(args));
    return res;
  };

  return {
    // Getter
    onGetterBotVersatile,
    onGetterMessages,

    // Action
    onActionGetVersatile,
    onActionSendMessage,
  };
});
