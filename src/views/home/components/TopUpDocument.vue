<script setup>
const props = defineProps({
  value: { type: String, required: false, default: () => {} },
});
</script>

<template>
  <div v-html="value" class="line-height-3" />
</template>
