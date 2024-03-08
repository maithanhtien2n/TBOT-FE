<script setup>
import { isMobileScreen } from "@/utils";
import { useRouter } from "vue-router";

const ROUTER = useRouter();

const props = defineProps({
  id: { type: String, required: true, default: "" },
  image: { type: String, required: true, default: "" },
  name: { type: String, required: true, default: "" },
});
</script>

<template>
  <div
    :style="{ width: isMobileScreen ? '30%' : '13%' }"
    :class="[
      `${
        isMobileScreen ? 'p-2' : 'p-3'
      } inline-flex flex-column align-items-center gap-2 card-bg border-round-lg on-click`,
    ]"
    @click="ROUTER.push({ name: 'BotVersatile', params: { id } })"
  >
    <img
      :src="image"
      alt="Lỗi ảnh"
      class="w-3rem h-3rem object-fit-cover border-circle"
    />
    <span>{{ name }}</span>
  </div>
</template>
