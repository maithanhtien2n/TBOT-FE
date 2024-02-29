<script setup>
import { formatDate } from "@/utils";
import { useRouter } from "vue-router";
import { onMounted, computed } from "vue";
import { STORE_NOTIFICATION } from "@/services/stores";
import IconTitle from "@/components/common/IconTitle.vue";

const ROUTER = useRouter();

const { onGetterListNotification, onActionGetListNotification } =
  STORE_NOTIFICATION.StoreNotification();

const listNotification = computed(() => onGetterListNotification.value.result);

const onClickNotificationTitle = (notificationId) => {
  ROUTER.push({ name: "NotificationDetail", params: { id: notificationId } });
};

onMounted(() => {
  onActionGetListNotification();
});
</script>

<template>
  <div class="flex h-full flex-column gap-3">
    <IconTitle icon="pi pi-bell" title="Thông báo" />

    <div class="flex h-full flex-column gap-2">
      <div
        v-for="(item, index) in listNotification"
        :key="index"
        class="card-bg flex gap-2"
      >
        <img
          class="w-4rem h-4rem border-circle"
          :src="item.image || '/images/image-product-default.svg'"
          onerror="this.onerror=null; this.src='/images/image-product-default.svg';"
        />
        <div class="flex flex-column gap-2">
          <span
            :class="{ 'font-bold': item?.isNewNotification }"
            class="text-900 line-height-2 on-click"
            @click="onClickNotificationTitle(item._id)"
          >
            {{ item.title }}
          </span>
          <span style="font-size: 0.9rem" class="text-700">
            {{ formatDate(item?.createdAt, true) }}
          </span>
        </div>
      </div>

      <div
        v-if="!listNotification?.length"
        class="card-bg flex-1 flex flex-column gap-3 justify-content-center align-items-center"
      >
        <i class="pi pi-volume-off text-2xl text-800" />
        <span class="text-800">Chưa có thông báo nào.</span>
      </div>
    </div>
  </div>
</template>
