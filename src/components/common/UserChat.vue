<script setup>
import { computed } from "vue";
import { isMobileScreen } from "@/utils";

const props = defineProps({
  name: { type: String, required: false, default: "" },
  content: { type: String, required: false, default: "" },
  role: { type: String, required: false, default: "" },
  createdAt: { type: String, required: false, default: "" },
});

const userChatInfo = computed(() => {
  switch (props.role) {
    case "user":
      return {
        avatar: "/images/user.jpg",
        name: "Bạn",
      };
    case "assistant":
      return {
        avatar: "/images/botai.webp",
        name: "Trợ lý ảo",
      };
    default:
      return {
        avatar: "/images/avatar.jpg",
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
        :src="userChatInfo.avatar"
        alt="Lỗi ảnh"
      />

      <div class="flex flex-column gap-1 w-full">
        <span class="font-bold text-800">{{ userChatInfo.name }}</span>
        <span class="text-custom-mini text-700">
          {{ createdAt || "đang tải..." }}
        </span>
      </div>
    </div>

    <div v-if="typeof content === 'string'" class="mt-2">
      <audio
        controls
        v-if="content.split('$')[1] === 'speech.mp3'"
        :style="{ width: `${isMobileScreen ? '100%' : '70%'}` }"
      >
        <source :src="content" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div
        v-if="content && content.split('$')[1] !== 'speech.mp3'"
        v-html="content"
        style="
          text-align: justify;
          white-space: pre-wrap;
          overflow-wrap: break-word;
          background-color: rgba(0, 255, 98, 0.11);
          padding: 0.5rem 0.8rem;
        "
        class="inline-block text-800 line-height-3 border-round-3xl"
      />

      <Skeleton
        v-if="!content"
        class="w-full mt-2 border-round-3xl"
        height="4rem"
      />
    </div>

    <div v-else class="mt-2">
      <div v-if="content?.length" class="flex gap-3">
        <div
          v-for="(img, index) in content"
          :key="index"
          class="relative w-10rem h-8rem border-round-lg overflow-hidden box-shadow-1"
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

      <div v-else class="flex gap-3">
        <Skeleton class="w-10rem h-8rem border-round-lg" />
        <Skeleton class="w-10rem h-8rem border-round-lg" />
      </div>
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
