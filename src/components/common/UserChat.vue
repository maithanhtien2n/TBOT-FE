<script setup>
import { computed } from "vue";
import { ToastService } from "@/utils/toast";
import { isMobileScreen, formatDate } from "@/utils";

const TOAST = ToastService();

const props = defineProps({
  value: {
    type: Object,
    required: false,
    default: () => {
      return {
        role: "",
        content: "",
        images: [],
        video: "",
        audio: "",
        createdAt: "",
      };
    },
  },
  type: { type: String, required: false, default: "CONTENT" },
  autoplay: { type: Boolean, required: false, default: false },
});

const userChatInfo = computed(() => {
  switch (props.value.role) {
    case "user":
      return {
        avatar: "/images/user.jpg",
        name: "Bạn",
        createdAt: props.value.createdAt,
      };
    case "assistant":
      return {
        avatar: "/images/botai.webp",
        name: "Trợ lý ảo",
        createdAt: props.value.createdAt,
      };
    default:
      return {
        avatar: "/images/botai.webp",
        name: "Trợ lý ảo",
        createdAt: formatDate(new Date(), true),
      };
  }
});
</script>

<template>
  <div class="inline-block">
    <div class="w-full flex gap-2">
      <img
        class="w-2rem h-2rem border-circle object-fit-cover box-shadow-1"
        :src="userChatInfo.avatar"
        alt="Lỗi ảnh"
      />

      <div class="flex flex-column gap-1 w-full">
        <span class="font-bold text-800">{{ userChatInfo.name }}</span>
        <span class="text-custom-mini text-700">
          {{ userChatInfo.createdAt || "đang tải..." }}
        </span>
      </div>
    </div>

    <div class="mt-2">
      <div
        v-if="value?.content"
        v-html="value?.content"
        style="
          text-align: justify;
          white-space: pre-wrap;
          overflow-wrap: break-word;
          background-color: rgba(0, 255, 98, 0.11);
          padding: 0.5rem 0.8rem;
        "
        :class="['inline-block text-800 line-height-3 border-round-3xl']"
      />

      <div v-if="value?.video" class="mt-2">
        <video controls class="w-23rem h-17rem border-round-2xl">
          <source :src="value?.video" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <audio
        v-if="value?.audio"
        controls
        :autoplay="autoplay"
        :style="{ width: `${isMobileScreen ? '100%' : '70%'}` }"
        class="mt-2"
      >
        <source :src="value?.audio" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div v-if="value?.images?.length" class="flex gap-3 mt-2">
        <div
          v-for="(img, index) in value?.images"
          :key="index"
          class="relative w-23rem h-17rem border-round-lg overflow-hidden box-shadow-1"
        >
          <img
            :src="img.url"
            onerror="this.onerror=null; this.src='/images/image-product-default.svg';"
            class="w-full h-full object-fit-cover"
          />

          <div
            class="absolute top-0 left-0 right-0 bottom-0 flex justify-content-center align-items-center"
          >
            <Image
              src="/images/image-product-default.svg"
              class="w-20rem h-10rem opacity-0"
              alt="Image"
              preview
            >
              <template #preview="slotProps">
                <img
                  :src="img.url"
                  alt="preview"
                  class="preview-image bg-white"
                  :style="slotProps.style"
                  @click="slotProps.onClick"
                />
              </template>
            </Image>
          </div>
        </div>
      </div>

      <div
        v-if="
          ['IMAGE', 'VIDEO'].includes(type) &&
          !value?.content &&
          !value?.audio &&
          !value?.video &&
          !value?.images?.length
        "
        class="flex gap-3"
      >
        <Skeleton class="max-w-23rem h-17rem border-round-lg" />
      </div>

      <Skeleton
        v-if="
          ['CONTENT', 'AUDIO'].includes(type) &&
          !value?.content &&
          !value?.audio &&
          !value?.video &&
          !value?.images?.length
        "
        class="w-full mt-2 border-round-3xl"
        height="4rem"
      />
    </div>
  </div>
</template>

<style scoped>
.preview-image {
  width: 40rem;
  max-height: 27rem;
  object-fit: contain;
}
</style>
