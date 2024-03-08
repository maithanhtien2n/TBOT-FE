import { defineStore } from "pinia";
import { API_APPLICATION } from "@/services/api";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";

export * as STORE_VIRTUAL_ASSISTANT from "../virtual-assistant/services/store";
export * as STORE_BOT_IMAGE from "../bot-image/services/store";
export * as STORE_BOT_AUDIO from "../bot-audio/services/store";
export * as STORE_BOT_VERSATILE from "../bot-versatile/services/store";

export const StoreApplication = defineStore("StoreApplication", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_APPLICATION.API_APPLICATION;

  // State
  const listBotVersatile = ref({});

  // Getter
  const onGetterListBotVersatile = computed(() => listBotVersatile);

  // Action
  const onActionGetListBotVersatile = async () => {
    const res = await onResponse(API.getListBotVersatile());
    listBotVersatile.value = res.data;
    return res;
  };

  return {
    // Getter
    onGetterListBotVersatile,

    // Action
    onActionGetListBotVersatile,
  };
});
