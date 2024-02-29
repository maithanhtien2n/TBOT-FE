<script setup>
import { useRoute } from "vue-router";
import TheHeader from "@/TheHeader.vue";
import TheFooter from "@/TheFooter.vue";
import { computed, onMounted } from "vue";
import {
  socket,
  accessToken,
  isMobileScreen,
  appLocalStorage,
  onEncryptedData,
} from "@/utils";
import {
  STORE_HOME,
  STORE_PERSONAL,
  STORE_NOTIFICATION,
  STORE_MONEY_WALLET,
} from "@/services/stores";

const ROUTE = useRoute();

const { onActionGetListQuestion } = STORE_HOME.StoreHome();

const { onActionGetListNotification } = STORE_NOTIFICATION.StoreNotification();

const { onActionGetUserInfo } = STORE_PERSONAL.StorePersonal();

const { onActionGetTopUpHistory } = STORE_MONEY_WALLET.StoreMoneyWallet();

const isShowHeader = computed(
  () =>
    ROUTE.fullPath.split("/").includes("app") &&
    +ROUTE.fullPath.split("/").length > 3
);

onMounted(() => {
  if (accessToken.value) {
    onActionGetListNotification(true);

    socket.on("isNewData", async (data) => {
      await onActionGetListNotification(true);

      onActionGetUserInfo(true).then((res) => {
        if (res.success) {
          appLocalStorage.value.userData = onEncryptedData(res?.data);
        }
      });

      onActionGetTopUpHistory(true);

      onActionGetListQuestion("EVERY_BODY", true);
    });
  }
});
</script>

<template>
  <div :class="['flex flex-column', { 'h-screen': ROUTE.name !== 'Home' }]">
    <!-- The header -->
    <TheHeader v-if="!isShowHeader" />

    <div
      :style="{ paddingBottom: isMobileScreen ? '7rem' : '1rem' }"
      :class="[`container-app pt-3 flex-1 ${isMobileScreen ? 'pb-8' : 'pb-4'}`]"
    >
      <router-view />
    </div>

    <!-- The footer -->
    <TheFooter />
  </div>
</template>
