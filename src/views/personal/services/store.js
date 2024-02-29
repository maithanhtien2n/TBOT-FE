import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";
import { API_PERSONAL } from "@/services/api";

export const StorePersonal = defineStore("StorePersonal", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_PERSONAL.API_PERSONAL;

  // State
  const userInfo = ref(null);

  // Getter
  const onGetterUserInfo = computed(() => userInfo);

  // Action
  const onActionGetUserInfo = async (noLoading) => {
    const res = await onResponse(API.getUserInfo(noLoading));
    userInfo.value = res.data;
    return res;
  };

  const onActionSaveUserInfo = async (args) => {
    const res = await onResponse(API.saveUserInfo(args), true);
    return res;
  };

  return {
    // Getter
    onGetterUserInfo,

    // Action
    onActionGetUserInfo,
    onActionSaveUserInfo,
  };
});
