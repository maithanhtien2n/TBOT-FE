import { defineStore } from "pinia";
import { API_VIRTUAL_ASSISTANT } from "../services/api";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";

export const StoreVirtualAssistant = defineStore(
  "StoreVirtualAssistant",
  () => {
    // Các hàm khác
    const { onResponse } = Utils();
    const API = API_VIRTUAL_ASSISTANT;

    // State
    const virtualAssistant = ref({});
    const messages = ref([]);

    // Getter
    const onGetterVirtualAssistant = computed(() => virtualAssistant);
    const onGetterMessages = computed(() => messages);

    // Action
    const onActionGetVirtualAssistant = async (noLoading) => {
      const res = await onResponse(API.getVirtualAssistant(noLoading));
      virtualAssistant.value = res.data;

      return res;
    };

    const onActionSaveVirtualAssistant = async (args) => {
      const res = await onResponse(API.saveVirtualAssistant(args), true);

      return res;
    };

    const onActionChat = async (args) => {
      const res = await onResponse(API.chat(args));

      return res;
    };

    const onActionCheckLinkChat = async (param) => {
      const res = await onResponse(API.checkLinkChat(param));

      return res;
    };

    const onActionCreateThread = async () => {
      const res = await onResponse(API.createThread());

      return res;
    };

    const onActionGetThread = async (id) => {
      const res = await onResponse(API.getThread(id));
      messages.value = res.data;
      return res;
    };

    return {
      // Getter
      onGetterVirtualAssistant,
      onGetterMessages,

      // Action
      onActionGetVirtualAssistant,
      onActionSaveVirtualAssistant,
      onActionChat,
      onActionCheckLinkChat,
      onActionCreateThread,
      onActionGetThread,
    };
  }
);
