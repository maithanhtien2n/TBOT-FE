<script setup>
import { onMounted, ref } from "vue";
import UserChat from "./UserChat.vue";
import { STORE_CATEGORY } from "@/services/stores";

const { onGetterMessages: messages, onActionChat } =
  STORE_CATEGORY.StoreVirtualAssistant();

const question = ref("");
const isSearchLoading = ref(false);
const scrollContainer = ref(null);

const onSetScrollTop = () => {
  setTimeout(() => {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
  }, 1);
};

const onReturnInfoUser = (role) => {
  switch (role) {
    case "user":
      return {
        image:
          "https://cdn.chanhtuoi.com/uploads/2020/05/icon-facebook-08-2.jpg.webp",
        name: "Bạn",
      };
    case "assistant":
      return {
        image: "https://cdn-icons-png.flaticon.com/512/1698/1698535.png",
        name: "Bot",
      };
    default:
      return "";
  }
};

const onChat = async () => {
  let contentReq = "";
  contentReq = question.value;
  question.value = "";
  messages.value.push({ role: "user", content: contentReq });
  onSetScrollTop();
  isSearchLoading.value = true;

  const res = await onActionChat({
    userId: "65817bdbdbfb9992f84884a8",
    content: contentReq,
  });

  if (res.success) {
    messages.value.push(res.data);
    onSetScrollTop();
  }
  isSearchLoading.value = false;
};

onMounted(() => {
  onSetScrollTop();
});
</script>

<template>
  <div class="relative flex-1">
    <div
      style="overflow-y: auto; bottom: 3.1rem"
      class="absolute top-0 left-0 right-0"
      ref="scrollContainer"
    >
      <!-- Chat content -->
      <div
        style="max-width: 40rem"
        class="flex flex-column gap-4 m-auto flex-1 h-full"
      >
        <!-- You -->
        <UserChat
          v-for="(item, index) in messages"
          :key="index"
          :image="onReturnInfoUser(item.role).image"
          :name="onReturnInfoUser(item.role).name"
          :message="item.content"
        />
        <br />

        <div
          v-if="!messages.length"
          class="flex h-full justify-content-center align-items-center"
        >
          <div class="flex flex-column gap-3 align-items-center">
            <img
              class="w-10rem h-10rem"
              src="https://cdn-icons-png.flaticon.com/512/1698/1698535.png"
              alt="Lỗi ảnh"
            />
            <span>Chào bạn, tôi là siêu chat bot do Tien Thanh tạo ra!</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input chat -->
    <div class="absolute bottom-0 left-0 right-0 px-3">
      <div
        style="max-width: 45rem"
        class="p-3 border-round-3xl box-shadow-1 flex bg-white m-auto flex-1"
      >
        <input
          v-model="question"
          type="text"
          class="w-full border-none outline-none"
          placeholder="Bạn muốn hỏi gì?"
          @keypress.enter="onChat"
        />

        <div style="padding-left: 0.7rem" class="border-left-1 text-400">
          <i v-if="isSearchLoading" class="pi pi-spin pi-spinner text-900" />
          <i
            v-else
            class="pi pi-angle-right text-900 on-click"
            :class="{ 'p-disabled': !question }"
            @click="onChat"
          />
        </div>
      </div>
    </div>
  </div>
</template>
