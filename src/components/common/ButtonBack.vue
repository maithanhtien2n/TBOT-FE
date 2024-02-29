<script setup>
import { accessToken } from "@/utils";

const emits = defineEmits(["onBack", "onNewChat"]);
</script>

<template>
  <div class="h-2rem"></div>
  <div class="fixed z-5 left-0 right-0 top-0 bg-green-light box-shadow-1">
    <div
      style="max-width: 52rem"
      class="m-auto flex justify-content-between align-items-center py-2 px-3"
    >
      <div
        style="background-color: rgb(255, 255, 255)"
        class="px-3 py-2 border-round-3xl"
      >
        <div
          v-if="accessToken"
          class="flex align-items-center gap-1 on-click"
          @click="emits('onBack')"
        >
          <i class="pi pi-angle-left" />
          <span>Trở lại</span>
        </div>

        <div
          v-else
          class="flex align-items-center gap-1 on-click"
          @click="emits('onNewChat')"
        >
          <!-- <i class="pi pi-plus-circle" /> -->
          <span>Trợ lý ảo</span>
        </div>
      </div>

      <div>Chatbot 1.0</div>
    </div>
  </div>
</template>
