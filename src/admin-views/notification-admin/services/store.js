import { defineStore } from "pinia";
import { API_NOTIFICATION_ADMIN } from "@/services/api";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";

export const StoreNotificationAdmin = defineStore(
  "StoreNotificationAdmin",
  () => {
    // Các hàm khác
    const { onResponse } = Utils();
    const API = API_NOTIFICATION_ADMIN.API_NOTIFICATION_ADMIN;

    // State
    const listNotification = ref({});
    const notificationInfo = ref({});

    // Getter
    const onGetterListNotification = computed(() => listNotification);
    const onGetterNotificationInfo = computed(() => notificationInfo);

    // Action
    const onActionGetListNotification = async (args, noLoading) => {
      const res = await onResponse(API.getListNotification(args, noLoading));
      listNotification.value = res.data;
      return res;
    };

    const onActionGetNotificationInfo = async (params, noLoading) => {
      const res = await onResponse(API.getNotificationInfo(params, noLoading));
      notificationInfo.value = res.data;
      return res;
    };

    const onActionSaveNotificationInfo = async (params, args) => {
      const res = await onResponse(
        API.saveNotificationInfo(params, args),
        true
      );
      return res;
    };

    const onActionUpdateStatusNotification = async (args) => {
      const res = await onResponse(API.updateStatusNotification(args), true);
      return res;
    };

    const onActionAddNotificationTopUp = async (args) => {
      const res = await onResponse(API.addNotificationTopUp(args));
      return res;
    };

    return {
      // Getter
      onGetterListNotification,
      onGetterNotificationInfo,

      // Action
      onActionGetListNotification,
      onActionGetNotificationInfo,
      onActionSaveNotificationInfo,
      onActionUpdateStatusNotification,
      onActionAddNotificationTopUp,
    };
  }
);
