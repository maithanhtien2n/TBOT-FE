<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { STORE_APPLICATION } from "@/services/stores";
import { isMobileScreen, formatDate, socket } from "@/utils";

const ROUTER = useRouter();

const { onGetterMessages: messages, onActionCreateAudio } =
  STORE_APPLICATION.STORE_BOT_AUDIO.StoreBotAudio();

const inputMessage = ref("");
const isAnswering = ref(false);

const onSetScrollTop = () => {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 1);
};

const onSendMessage = async () => {
  if (
    isAnswering.value ||
    (messages.value.length &&
      messages.value[messages.value.length - 1].role === "user")
  ) {
    return;
  }
  messages.value.push({
    role: "user",
    content: inputMessage.value,
    createdAt: formatDate(new Date(), true),
  });
  onSetScrollTop();

  let inputMessageClone = inputMessage.value;
  inputMessage.value = "";
  setTimeout(() => {
    isAnswering.value = true;
    onSetScrollTop();
  }, 1000);

  const res = await onActionCreateAudio({ input: inputMessageClone });

  if (res.success) {
    messages.value.push(res.data);
    socket.emit("isNewData", "Dữ liệu mới");
  } else {
    messages.value = [];
  }

  onSetScrollTop();
  isAnswering.value = false;
};

onMounted(async () => {});
</script>

<template>
  <div class="relative flex flex-column h-full">
    <ButtonBack @onBack="ROUTER.push({ name: 'Application' })" />

    <div class="w-full flex flex-column h-full">
      <div
        style="max-width: 52rem"
        :class="{
          'px-3': !isMobileScreen,
          'justify-content-center': !messages.length,
        }"
        class="flex flex-1 flex-column gap-3 m-auto w-full pt-3"
      >
        <!-- You -->
        <UserChat
          v-for="(item, index) in messages"
          :key="index"
          :value="item"
        />

        <UserChat v-if="isAnswering" />

        <div
          v-if="!messages.length"
          class="flex justify-content-center align-items-center text-center line-height-3"
        >
          <div class="flex flex-column gap-3 align-items-center">
            <img
              class="w-10rem h-10rem object-fit-cover border-circle"
              src="/images/audio-ai.jpeg"
              alt="Lỗi ảnh"
            />
            <span class="text-center line-height-2">
              Có rất nhiều giọng đọc cho bạn lựa chọn!
            </span>
          </div>
        </div>
      </div>

      <div v-if="!isMobileScreen" class="h-4rem"></div>

      <!-- Input chat -->
      <div
        style="bottom: 1.8rem; z-index: 999"
        class="fixed left-0 right-0 px-3 bg-white pt-2"
      >
        <div
          style="max-width: 50rem"
          class="p-3 border-round-3xl box-shadow-1 flex bg-white m-auto flex-1"
        >
          <input
            v-model="inputMessage"
            type="text"
            class="w-full border-none outline-none"
            placeholder="Nhập văn bản cần chuyển đổi?"
            @keypress.enter="onSendMessage"
          />

          <div style="padding-left: 0.7rem" class="border-left-1 text-400">
            <i v-if="isAnswering" class="pi pi-spin pi-spinner text-900" />
            <i
              v-else
              class="pi pi-angle-right text-900 on-click"
              :class="{ 'p-disabled': !inputMessage }"
              @click="onSendMessage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
