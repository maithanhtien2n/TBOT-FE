<script setup>
const props = defineProps({
  icon: { type: String, required: false, default: "" },
  title: { type: String, required: false, default: "" },
});
</script>

<template>
  <div class="flex gap-2 align-items-center unselectable">
    <i style="font-size: 1.1rem" :class="['text-700', icon]" />
    <span style="font-size: 1.1rem" class="text-800">
      {{ title }}
    </span>
  </div>
</template>
