<script setup>
import { computed } from "vue";
import DATA from "@/services/data";
import { useRoute } from "vue-router";
import { isMobileScreen } from "@/utils";
import { STORE_NOTIFICATION } from "@/services/stores";
import MenuItem from "@/components/common/MenuItem.vue";

const ROUTE = useRoute();

const { onGetterListNotification } = STORE_NOTIFICATION.StoreNotification();

const listMenu = computed(() => DATA.listMenu);

const notificationLength = computed(
  () => onGetterListNotification.value.newNotification
);

const isShowFooter = computed(
  () =>
    ROUTE.fullPath.split("/").includes("app") &&
    +ROUTE.fullPath.split("/").length > 3
);
</script>

<template>
  <div
    v-if="
      isMobileScreen &&
      !isShowFooter &&
      !['Login', 'Register', 'OtpAuthentication'].includes(ROUTE.name)
    "
    style="z-index: 9999 !important"
    class="bg-green-light fixed bottom-0 left-0 right-0 p-3 flex align-items-center justify-content-between"
  >
    <MenuItem
      v-for="(item, index) in listMenu"
      :key="index"
      :icon="item.icon"
      :route="item.route"
      :isSelect="item.route.name === ROUTE.name"
      :notification="{
        color: 'rgb(245, 58, 58)',
        amount: notificationLength,
        isShow: ['Notification'].includes(item.route.name),
      }"
    />
  </div>

  <div
    v-else
    class="fixed text-custom-mini text-700 bottom-0 left-0 right-0 text-center p-2 bg-white"
  >
    Copyright © 2024 developed by tien thanh
  </div>
  <div
    v-if="!['Login', 'Register', 'OtpAuthentication'].includes(ROUTE.name)"
    class="w-full py-3"
  />
</template>

<style scoped>
.active-item {
  color: #10b981 !important;
}
</style>
