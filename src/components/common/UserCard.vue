<script setup>
import { formatDate, userData } from "@/utils";

const props = defineProps({
  value: {
    type: Object,
    required: true,
    default: () => {
      return {
        avatar: "",
        fullName: "",
        sentDate: null,
        content: "",
      };
    },
  },
});
</script>

<template>
  <div class="flex flex-column gap-1 unselectable">
    <div class="w-full flex gap-2">
      <img
        v-if="value?.avatar"
        class="avatar"
        :src="value?.avatar || '/images/avatar.jpg'"
        onerror="this.onerror=null; this.src='/images/avatar.jpg';"
      />

      <Avatar
        v-else
        :label="value?.fullName?.charAt(0).toUpperCase()"
        shape="circle"
        class="avatar"
      />

      <div class="flex flex-column gap-1 flex-1">
        <span class="font-bold text-600">
          {{ value?.fullName }}
        </span>
        <span class="text-custom-mini text-700">
          {{ value?.sentDate || "đang tải..." }}
        </span>
        <div
          v-html="value?.content"
          style="
            text-align: justify;
            white-space: pre-wrap;
            overflow-wrap: break-word;
          "
          class="w-full text-800 line-height-3"
        />
      </div>
    </div>
  </div>
</template>
