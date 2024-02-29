<script setup>
const props = defineProps({
  value: {
    type: Object,
    required: false,
    default: () => {},
  },
});
</script>

<template>
  <div class="flex gap-2">
    <div class="avatar relative overflow-hidden">
      <img
        v-if="props?.value?.image || '/images/avatar.jpg'"
        class="avatar object-fit-cover border-1 text-300"
        :src="props?.value?.image || '/images/avatar.jpg'"
        onerror="this.onerror=null; this.src='/images/avatar.jpg';"
      />
      <Skeleton
        v-if="!props?.value?.image"
        class="absolute top-0 bottom-0 left-0 right-0"
        width="3rem"
        height="3rem"
      />
    </div>
    <div class="flex flex-column gap-1">
      <div
        style="font-size: 1rem height: 1rem;"
        class="font-bold text-800 overflow-hidden"
      >
        <span> {{ props?.value?.name }}</span>
        <Skeleton
          v-if="!props?.value?.name"
          width="10rem"
          height="1rem"
          class="border-round-3xl"
        />
      </div>

      <div>
        <slot v-if="props?.value?.name" />
        <Skeleton
          v-else
          width="5rem"
          height=".6rem"
          class="mt-1 border-round-3xl"
        />
      </div>
    </div>
  </div>
</template>
