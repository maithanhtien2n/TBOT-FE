<script setup>
import { ref } from "vue";
import { StoreApp } from "@/services/stores";

const { onActionDisplayAdvertisement, onGetterDisplayAdvertisement: display } =
  StoreApp();
</script>

<template>
  <div
    v-if="display"
    style="z-index: 999999999999 !important"
    @click.stop="onActionDisplayAdvertisement(false)"
    class="fixed top-0 right-0 bottom-0 left-0 bg-black-alpha-50 flex align-items-center justify-content-center"
  >
    <div class="relative p-3">
      <i
        style="
          top: 1rem;
          right: 1rem;
          background-color: rgba(240, 248, 255, 0.363);
        "
        class="icon pi pi-times absolute p-2 border-circle on-click"
        @click="onActionDisplayAdvertisement(false)"
      />

      <img
        @click.stop
        style="object-fit: contain; max-width: 370px"
        src="https://banghieudanang.com/wp-content/uploads/2022/03/banner_home-1.png"
        alt="Lỗi ảnh"
      />
    </div>
  </div>

  <Dialog v-model:visible="display" modal class="opacity-0" />
</template>

<style scoped>
.icon {
  transition: all 0.2s ease;
}
.icon:hover {
  background-color: rgba(204, 207, 209, 0.719) !important;
}
</style>
