<script setup>
const props = defineProps({
  display: {
    type: Boolean,
    required: false,
    default: false,
  },
  opacity: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emits = defineEmits(["onRemovePopup"]);

const onClickRemovePopup = () => {
  emits("onRemovePopup");
};
</script>

<template>
  <div
    v-if="props.display"
    @click="onClickRemovePopup"
    class="bg-black-alpha-60 fixed top-0 left-0 right-0 bottom-0"
  />
</template>
