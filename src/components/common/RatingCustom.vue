<script setup>
import { ref, toRef, watch } from "vue";

const props = defineProps({
  value: {
    type: Number,
    required: false,
    default: 0,
  },
});

const emits = defineEmits(["onUpdate"]);

const value = ref(toRef(props, "value"));

const onUpdate = (e) => {
  emits("onUpdate", e);
};
</script>

<template>
  <Rating v-model="value" :cancel="false">
    <template #onicon>
      <i style="font-size: 0.8rem" class="pi pi-star-fill text-main-color" />
    </template>
    <template #officon>
      <i style="font-size: 0.8rem" class="pi pi-star text-main-color" />
    </template>
  </Rating>
</template>
