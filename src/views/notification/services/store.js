import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";
import { API_NOTIFICATION } from "@/services/api";

export const StoreNotification = defineStore("StoreNotification", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_NOTIFICATION.API_NOTIFICATION;

  // State
  const listNotification = ref([]);
  const notificationInfo = ref({});

  // Getter
  const onGetterListNotification = computed(() => listNotification);
  const onGetterNotificationInfo = computed(() => notificationInfo);

  // Action
  const onActionGetListNotification = async (noLoading) => {
    const res = await onResponse(API.getListNotification(noLoading));
    listNotification.value = res.data;
    return res;
  };

  const onActionGetNotificationInfo = async (params) => {
    const res = await onResponse(API.getNotificationInfo(params));
    notificationInfo.value = res.data;
    return res;
  };

  return {
    // Getter
    onGetterListNotification,
    onGetterNotificationInfo,

    // Action
    onActionGetListNotification,
    onActionGetNotificationInfo,
  };
});
