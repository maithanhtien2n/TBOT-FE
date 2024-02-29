<script setup>
import DATA from "@/services/data";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { STORE_NOTIFICATION } from "@/services/stores";
import MenuItem from "@/components/common/MenuItem.vue";
import {
  userData,
  accountId,
  formatToVND,
  accessToken,
  isMobileScreen,
  onDeleteAppLocalStorage,
} from "@/utils";

const ROUTE = useRoute();
const ROUTER = useRouter();

const { onGetterListNotification } = STORE_NOTIFICATION.StoreNotification();

const listMenu = computed(() => {
  return DATA.listMenu.filter(({ isPC }) => isPC);
});

const notificationLength = computed(
  () => onGetterListNotification.value?.newNotification
);

const routeNameCurrent = computed(() => ROUTE.name);

const onReturnHeightHeader = computed(() => {
  if (ROUTE.name !== "Home") {
    return "75px";
  }

  if (accessToken.value) {
    return "172px";
  }

  return "161px";
});

const isDisplaySidebarMenu = ref(false);

const isDisplayUserInfo = ref(false);

const onCustomRoute = (route) => {
  let routeClone = route;

  switch (route.name) {
    case "VirtualAssistant":
      routeClone.params = {
        accountId: accessToken.value ? accountId.value : "#",
      };
      return routeClone;
    default:
      return route;
  }
};

const onClickMenuItem = (route = { name: "", params: null, query: null }) => {
  ROUTER.push({ name: route.name, params: route.params, query: route.query });

  isDisplayUserInfo.value = false;
  isDisplaySidebarMenu.value = false;
};

const onClickLogOut = () => {
  onGetterListNotification.value = [];
  onDeleteAppLocalStorage();
};
</script>

<template>
  <!-- Dành cho điện thoại -->
  <div v-if="isMobileScreen">
    <div
      :class="{ 'py-5': ROUTE.name === 'Home' }"
      style="top: 0rem; left: 0rem; right: 1rem; z-index: 999"
      class="fixed bg-green-light w-full p-3 flex align-items-center justify-content-between"
    >
      <div v-if="accessToken" class="flex flex-column gap-4">
        <div class="flex gap-2">
          <img
            v-if="userData?.avatar"
            class="avatar object-fit-cover"
            :src="userData?.avatar || '/images/avatar.jpg'"
            onerror="this.onerror=null; this.src='/images/avatar.jpg';"
          />

          <Avatar
            v-else
            :label="userData?.email?.charAt(0).toUpperCase()"
            shape="circle"
            class="avatar"
          />

          <div class="flex flex-column gap-1">
            <span class="text-custom-mini">Xin chào!</span>
            <span class="font-bold">{{ userData?.email }}</span>
          </div>
        </div>

        <div v-if="routeNameCurrent === 'Home'" class="flex flex-column gap-2">
          <span class="text-custom-mini">Tổng số dư hiện tại</span>
          <span style="font-size: 1.2rem" class="text-custom-mini">
            $ {{ formatToVND(userData?.moneyBalance) }}
          </span>
        </div>
      </div>

      <div v-else class="flex flex-column gap-3">
        <div class="flex align-items-center gap-2">
          <div
            style="background-color: aliceblue"
            class="avatar flex align-items-center justify-content-center"
          >
            <i class="pi pi-lock" />
          </div>

          <span
            style="background-color: aliceblue; padding: 0.6rem 0.8rem"
            class="on-click border-round-3xl"
            @click="ROUTER.push({ name: 'Login' })"
          >
            Đăng nhập
          </span>
        </div>

        <div style="max-width: 12rem" class="text-custom-mini line-height-3">
          Đăng nhập vào hệ thống để trải nghiệm dịch vụ tốt nhất!
        </div>
      </div>

      <div
        v-if="ROUTE.name === 'Personal'"
        style="color: rgb(216, 64, 64)"
        class="on-click"
        @click="onClickLogOut"
      >
        Đăng xuất
      </div>
    </div>
    <div :style="{ height: onReturnHeightHeader }" class="w-full" />
  </div>

  <!-- Dành cho máy tính -->
  <div v-else>
    <Sidebar v-model:visible="isDisplaySidebarMenu" header=" " class="w-17rem">
      <div class="flex flex-column h-full">
        <div
          v-for="(item, index) in listMenu"
          :key="index"
          class="p-3 on-click flex align-items-center gap-2"
          :class="{
            'active-item': item.route.name === routeNameCurrent,
            'menu-item': item.route.name !== routeNameCurrent,
          }"
          @click="onClickMenuItem(onCustomRoute(item.route))"
        >
          <i :class="`pi ${item.icon}`" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </Sidebar>

    <div
      style="z-index: 9"
      class="fixed top-0 left-0 right-0 bg-white box-shadow-1"
    >
      <div
        class="container-app h-4rem flex align-items-center justify-content-between"
      >
        <div class="flex gap-3 align-items-center">
          <i
            style="font-size: 1.3rem"
            class="pi pi-align-left on-click text-600"
            @click="isDisplaySidebarMenu = true"
          />

          <div
            class="text-2xl font-bold text-600 on-click"
            @click="ROUTER.push({ name: 'Home' })"
          >
            T B O T A I
          </div>
        </div>

        <div v-if="accessToken" class="flex gap-6 align-items-center">
          <!-- Thông báo -->
          <div class="flex gap-3">
            <MenuItem
              icon="pi-wallet"
              :route="{ name: 'MoneyWallet' }"
              :isSelect="'MoneyWallet' === ROUTE.name"
            />

            <MenuItem
              icon="pi-bell"
              :route="{ name: 'Notification' }"
              :isSelect="'Notification' === ROUTE.name"
              :notification="{
                color: 'rgb(245, 58, 58)',
                amount: notificationLength,
                isShow: true,
              }"
            />
          </div>

          <!-- Thông tin người dùng -->
          <div class="user-info relative flex gap-2 align-items-center">
            <span>{{ userData.user }}</span>
            <img
              v-if="userData?.avatar"
              class="avatar object-fit-cover"
              :src="userData?.avatar || '/images/avatar.jpg'"
              onerror="this.onerror=null; this.src='/images/avatar.jpg';"
            />

            <Avatar
              v-else
              :label="userData?.email?.charAt(0).toUpperCase()"
              shape="circle"
              class="avatar"
            />

            <div style="padding-bottom: 0.15rem" class="flex flex-column gap-1">
              <span>{{ userData?.email }}</span>

              <span class="text-custom-mini">
                $ {{ formatToVND(userData?.moneyBalance) }}
              </span>
            </div>

            <i class="pi pi-angle-down text-600 on-click" />

            <!-- Tùy chọn thông tin người dùng -->
            <div
              style="top: 100%; right: 0"
              class="option-user-info absolute card w-12rem flex flex-column bg-white px-0 py-2"
            >
              <span
                class="item-option on-click p-3"
                @click="onClickMenuItem({ name: 'Personal' })"
              >
                Thông tin người dùng
              </span>

              <span
                style="color: rgb(219, 9, 9)"
                class="item-option on-click p-3"
                @click="onClickLogOut"
              >
                Đăng xuất
              </span>
            </div>
          </div>
        </div>

        <div v-else class="flex gap-4">
          <span class="on-click" @click="ROUTER.push({ name: 'Login' })">
            Đăng nhập
          </span>
          <span
            class="on-click"
            @click="ROUTER.push({ name: 'OtpAuthentication' })"
          >
            Đăng ký
          </span>
        </div>
      </div>
    </div>
    <div class="w-full h-4rem" />
  </div>
</template>

<style scoped>
/* Máy tính */
.menu-item {
  transition: all 0.2s ease;
}

.menu-item:hover {
  background-color: #4caf4f71;
}

.active-item {
  color: #10b981;
}

.item-option:hover {
  background-color: #ddd;
}

.option-user-info {
  z-index: 9999 !important;
  display: none !important;
}

.user-info:hover .option-user-info {
  display: inline-flex !important;
}

/* Điện thoại */
</style>
