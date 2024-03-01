<script setup>
import DATA from "@/services/data";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  accessToken,
  onDeleteAppLocalStorage,
  userData,
  formatToVND,
} from "@/utils";

const ROUTE = useRoute();
const ROUTER = useRouter();

const isDisplaySidebarMenu = ref(false);

const listMenuAdmin = computed(() => DATA.listMenuAdmin);

const routeNameCurrent = computed(() => ROUTE.name);

const onClickMenuItem = (routeName) => {
  ROUTER.push({ name: routeName });

  isDisplaySidebarMenu.value = false;
};
</script>

<template>
  <div class="flex flex-column h-screen">
    <!-- The header -->
    <div>
      <Sidebar
        v-model:visible="isDisplaySidebarMenu"
        header=" "
        class="w-17rem"
      >
        <div class="flex flex-column h-full">
          <div
            v-for="(item, index) in listMenuAdmin"
            :key="index"
            class="p-3 on-click flex align-items-center gap-2"
            :class="{
              'active-item': item.routeName === routeNameCurrent,
              'menu-item': item.routeName !== routeNameCurrent,
            }"
            @click="onClickMenuItem(item.routeName)"
          >
            <i :class="`pi ${item.icon}`" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </Sidebar>

      <div class="w-full h-4rem" />
      <div class="fixed top-0 left-0 right-0 z-5 box-shadow-1 bg-white">
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
              class="text-main-color on-click flex gap-1"
              @click="ROUTER.push({ name: 'HomeAdmin' })"
            >
              <span class="text-2xl font-bold">T B O T</span>
              <span class="text-right text-custom-mini">Admin</span>
            </div>
          </div>

          <div class="user-info relative flex gap-1 align-items-center">
            <div class="flex flex-column gap-1">
              <span class="text-700">{{ userData?.email }}</span>
              <div class="text-right">
                <span
                  class="text-main-color text-custom-mini border-1 py-1 px-2 border-round-2xl"
                >
                  {{ userData?.role }}
                </span>
              </div>
            </div>
            <i class="pi pi-angle-down text-700" />

            <!-- Tùy chọn thông tin người dùng -->
            <div
              style="top: 100%; right: 0"
              class="option-user-info absolute card w-12rem flex flex-column bg-white px-0 py-2"
            >
              <span
                style="color: rgb(219, 9, 9)"
                class="item-option on-click p-3"
                @click="onDeleteAppLocalStorage()"
              >
                Đăng xuất
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-app flex-1 my-3">
      <router-view />
    </div>

    <!-- The footer -->
    <div class="text-custom-mini text-700 text-center p-2">
      Copyright © 2024 developed by tien thanh
    </div>
  </div>
</template>

<style scoped>
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
  z-index: 999;
  display: none !important;
}

.user-info:hover .option-user-info {
  display: inline-flex !important;
}
</style>
