<script setup>
import { isMobileScreen } from "@/utils";

const props = defineProps({
  value: { type: Object, required: false, default: () => {} },
});
</script>

<template>
  <!-- Danh cho điện thoại -->
  <div v-if="isMobileScreen" class="flex flex-column gap-4">
    <div class="flex flex-column gap-2">
      <span>Video hướng dẫn:</span>

      <iframe
        height="200"
        :src="`https://www.youtube.com/embed/${value?.video}`"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="w-full border-none"
      />
    </div>

    <div class="flex flex-column gap-2">
      <span>Tài liệu cụ thể:</span>

      <div v-html="value?.content" />
    </div>
  </div>

  <!-- Dành cho máy tính -->
  <div v-else class="flex flex-column gap-4">
    <div class="flex flex-column gap-2">
      <span>Video hướng dẫn:</span>

      <iframe
        style="max-width: 37rem"
        height="300"
        :src="`https://www.youtube.com/embed/${value?.video}`"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="border-none"
      />
    </div>

    <div class="flex flex-column gap-2">
      <span>Tài liệu cụ thể:</span>

      <div v-html="value?.content" />
    </div>
  </div>
</template>
