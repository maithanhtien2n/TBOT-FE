<script setup>
import IconTitle from "@/components/common/IconTitle.vue";
import { STORE_NOTIFICATION } from "@/services/stores";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { formatDate } from "@/utils";

const ROUTE = useRoute();

const {
  onGetterNotificationInfo: notificationInfo,
  onGetterListNotification,
  onActionGetNotificationInfo,
  onActionGetListNotification,
} = STORE_NOTIFICATION.StoreNotification();

const notificationId = computed(() => ROUTE.params.id);

onMounted(async () => {
  onActionGetNotificationInfo(notificationId.value).then((res) => {
    if (res.success && res.data.isNewNotification) {
      onGetterListNotification.value.newNotification -= 1;
    }
  });
  onActionGetListNotification(true);
});
</script>

<template>
  <div class="flex h-full flex-column gap-3">
    <IconTitle icon="pi pi-bell" title="Chi tiết thông báo" />

    <div class="flex flex-column gap-2">
      <span>{{ notificationInfo?.title }}</span>
      <span style="font-size: 0.9rem">
        {{ formatDate(notificationInfo?.createdAt, true) }}
      </span>
    </div>

    <div
      v-html="notificationInfo.content"
      class="card-bg line-height-3"
      style="overflow-wrap: break-word"
    />
  </div>
</template>
