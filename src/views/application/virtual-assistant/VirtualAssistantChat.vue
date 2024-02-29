<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { STORE_APPLICATION } from "@/services/stores";
import { isMobileScreen, socket } from "@/utils";

const ROUTE = useRoute();
const ROUTER = useRouter();

const {
  onGetterMessages: messages,
  onActionChat,
  onActionCheckLinkChat,
  onActionCreateThread,
  onActionGetThread,
} = STORE_APPLICATION.STORE_VIRTUAL_ASSISTANT.StoreVirtualAssistant();

const inputMessage = ref("");
const isAnswering = ref(false);

const threadId = computed(() => ROUTE.query.thread);
const accountIdPrams = computed(() => ROUTE.query.accountId);

const onSetScrollTop = () => {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 1);
};

const onClickButtonBack = () => {
  messages.value = [];
  ROUTER.replace({ name: "VirtualAssistant" });
};

const onSendMessage = async () => {
  if (
    isAnswering.value ||
    (messages.value.length &&
      messages.value[messages.value.length - 1].role === "user")
  ) {
    return;
  }

  messages.value.push({ role: "user", content: inputMessage.value });
  onSetScrollTop();

  let inputMessageClone = inputMessage.value;
  inputMessage.value = "";
  setTimeout(() => {
    isAnswering.value = true;
    onSetScrollTop();
  }, 1000);

  const res = await onActionChat({
    threadId: threadId.value,
    accountId: accountIdPrams.value,
    content: inputMessageClone,
  });

  if (res.success) {
    messages.value = res.data;
    socket.emit("isNewData", "Dữ liệu mới");
  }

  onSetScrollTop();
  isAnswering.value = false;
};

onMounted(async () => {
  const resCheckLinkChat = await onActionCheckLinkChat(accountIdPrams.value);
  if (!resCheckLinkChat.success) {
    if (resCheckLinkChat.statusCode === "ERROR_BALANCE") {
      ROUTER.replace({ name: "RequiredTopUp" });
      return;
    }
    ROUTER.replace({ name: "NotFound" });
    return;
  } else {
    if (!threadId.value) {
      const resCreateThread = await onActionCreateThread();
      if (resCreateThread.success) {
        ROUTER.replace({
          name: "VirtualAssistantChat",
          query: {
            accountId: accountIdPrams.value,
            thread: resCreateThread.data.id,
          },
        });
      }
    } else {
      await onActionGetThread(threadId.value);
    }
  }

  onSetScrollTop();
});
</script>

<template>
  <div class="relative flex flex-column h-full">
    <ButtonBack @onBack="onClickButtonBack" />

    <div
      :class="{ 'p-disabled': !threadId }"
      class="w-full flex flex-column h-full"
    >
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
          :name="item.role"
          :content="item.content"
          :role="item.role"
          :createdAt="item.createdAt"
        />

        <UserChat v-if="isAnswering" role="assistant" />

        <div
          v-if="!messages.length"
          class="flex justify-content-center align-items-center"
        >
          <div class="flex flex-column gap-3 align-items-center">
            <img
              class="w-10rem h-10rem"
              src="https://cdn-icons-png.flaticon.com/512/1698/1698535.png"
              alt="Lỗi ảnh"
            />
            <span class="text-center line-height-2">
              Tôi đã sẵng sàng trả lời câu hỏi của bạn!
            </span>
          </div>
        </div>
      </div>

      <div v-if="!isMobileScreen" class="h-4rem"></div>

      <!-- Input chat -->
      <div
        style="bottom: 1.8rem; z-index: 9999"
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
            placeholder="Bạn muốn hỏi gì?"
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
