<script setup>
import { computed } from "vue";

const props = defineProps({
  image: { type: String, required: false, default: "" },
  name: { type: String, required: false, default: "" },
  message: { type: String, required: false, default: "" },
  role: { type: String, required: false, default: "" },
  createdAt: { type: String, required: false, default: "" },
});

const userChatInfo = computed(() => {
  switch (props.role) {
    case "user":
      return {
        image: "/images/user.jpg",
        name: "Bạn",
      };
    case "assistant":
      return {
        image: "/images/botai.webp",
        name: "Trợ lý ảo",
      };
    default:
      return {
        image:
          "https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg",
        name: "",
      };
  }
});
</script>

<template>
  <div class="inline-block">
    <div class="w-full flex gap-2">
      <img
        class="w-2rem h-2rem border-circle object-fit-cover box-shadow-1"
        :src="
          userChatInfo.image ||
          'https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg'
        "
        alt="Lỗi ảnh"
      />

      <div class="flex flex-column gap-1 w-full">
        <span class="font-bold text-800">{{ userChatInfo.name }}</span>
        <span class="text-custom-mini text-700">
          {{ createdAt || "đang tải..." }}
        </span>
      </div>
    </div>

    <div
      v-if="message"
      v-html="message"
      style="
        text-align: justify;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        background-color: rgba(0, 255, 98, 0.11);
        padding: 0.5rem 0.8rem;
      "
      class="mt-2 inline-block text-800 line-height-3 border-round-3xl"
    />

    <Skeleton v-else class="w-full mt-2 border-round-3xl" height="4rem" />
  </div>
</template>
