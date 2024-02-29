<script setup>
import { useRouter } from "vue-router";
import { accountId } from "@/utils";

const ROUTER = useRouter();
</script>

<template>
  <div class="h-full flex justify-content-center align-items-center">
    <ButtonBack @onBack="ROUTER.push({ name: 'Application' })" />

    <div class="flex flex-column gap-4">
      <img
        style="object-fit: contain"
        class="h-13rem"
        src="/images/botai-main.png"
        alt="Lỗi ảnh"
      />
      <div class="flex gap-3">
        <button
          class="btn on-click bg-transparent bg-white"
          @click="ROUTER.push({ name: 'VirtualAssistantConfig' })"
        >
          Cấu hình cho bot
        </button>
        <button
          style="color: aliceblue"
          class="btn on-click bg-main-color"
          @click="
            ROUTER.push({
              name: 'VirtualAssistantChat',
              query: { accountId },
            })
          "
        >
          Bản thử nghiệm
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item-active {
  background-color: #8f8f8f;
}
</style>
