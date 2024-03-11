import { defineStore } from "pinia";
import { API_APPLICATION_ADMIN } from "@/services/api";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";

export const StoreApplicationAdmin = defineStore(
  "StoreApplicationAdmin",
  () => {
    // Các hàm khác
    const { onResponse } = Utils();
    const API = API_APPLICATION_ADMIN.API_APPLICATION_ADMIN;

    // State
    const listBotVersatile = ref({});

    // Getter
    const onGetterListBotVersatile = computed(() => listBotVersatile);

    // Action
    const onActionGetListBotVersatile = async (args, noLoading) => {
      const res = await onResponse(API.getListBotVersatile(args, noLoading));
      listBotVersatile.value = res.data;
      return res;
    };

    const onActionSaveBotVersatile = async (args) => {
      const res = await onResponse(API.saveBotVersatile(args), true);
      return res;
    };

    const onActionUpdateStatusBotVersatile = async (args) => {
      const res = await onResponse(API.updateStatusBotVersatile(args), true);
      return res;
    };

    return {
      // Getter
      onGetterListBotVersatile,

      // Action
      onActionGetListBotVersatile,
      onActionSaveBotVersatile,
      onActionUpdateStatusBotVersatile,
    };
  }
);
