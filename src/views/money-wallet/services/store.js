import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";
import { API_MONEY_WALLET } from "@/services/api";

export const StoreMoneyWallet = defineStore("StoreMoneyWallet", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_MONEY_WALLET.API_MONEY_WALLET;

  // State
  const topUpHistory = ref([]);

  // Getter
  const onGetterTopUpHistory = computed(() => topUpHistory);

  // Action
  const onActionGetTopUpHistory = async (noLoading) => {
    const res = await onResponse(API.getTopUpHistory(noLoading));
    topUpHistory.value = res.data;
    return res;
  };

  return {
    // Getter
    onGetterTopUpHistory,

    // Action
    onActionGetTopUpHistory,
  };
});
