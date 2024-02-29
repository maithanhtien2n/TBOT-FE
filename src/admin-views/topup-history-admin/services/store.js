import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";
import { API_TOP_UP_HISTORY_ADMIN } from "@/services/api";

export const StoreTopUpHistoryAdmin = defineStore(
  "StoreTopUpHistoryAdmin",
  () => {
    // Các hàm khác
    const { onResponse } = Utils();
    const API = API_TOP_UP_HISTORY_ADMIN.API_TOP_UP_HISTORY_ADMIN;

    // State
    const topUpHistory = ref([]);

    // Getter
    const onGetterTopUpHistory = computed(() => topUpHistory);

    // Action
    const onActionGetTopUpHistory = async (params, noLoading) => {
      const res = await onResponse(API.getTopUpHistory(params, noLoading));
      topUpHistory.value = res.data;
      return res;
    };

    return {
      // Getter
      onGetterTopUpHistory,

      // Action
      onActionGetTopUpHistory,
    };
  }
);
