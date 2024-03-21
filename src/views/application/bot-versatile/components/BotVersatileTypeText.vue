<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { STORE_APPLICATION } from "@/services/stores";
import { isMobileScreen, formatDate, socket } from "@/utils";

const ROUTE = useRoute();

const props = defineProps({
  botVersatile: { type: Object, required: true },
  type: { type: String, required: false, default: "TEXT" },
});

const { onGetterMessages: messages, onActionSendMessage } =
  STORE_APPLICATION.STORE_BOT_VERSATILE.StoreBotVersatile();

const inputMessage = ref("");
const isAnswering = ref(false);

const botVersatile = computed(() => props.botVersatile);
const botVersatileId = computed(() => ROUTE.params.id);

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

  inputMessage.value = "";
  setTimeout(() => {
    isAnswering.value = true;
    onSetScrollTop();
  }, 1000);

  const res = await onActionSendMessage({
    botVersatileId: botVersatileId.value,
    messages: messages.value.map(({ role, content }) => ({ role, content })),
  });

  if (res.success) {
    messages.value.push(res.data.result);
    socket.emit("isNewData", "Dữ liệu mới");
  } else {
    messages.value = [];
  }

  isAnswering.value = false;
  onSetScrollTop();

  setTimeout(() => {
    isAnswering.value = false;
  }, 300);
};
</script>

<template>
  <div class="w-full flex flex-column h-full">
    <div
      style="max-width: 52rem"
      :class="[
        'flex flex-1 flex-column gap-3 m-auto w-full pt-3',
        {
          'px-3': !isMobileScreen,
          'justify-content-center': !messages.length,
        },
      ]"
    >
      <!-- You -->
      <UserChat v-for="(item, index) in messages" :key="index" :value="item" />

      <UserChat v-if="isAnswering" :type="type" />

      <div
        v-if="!messages.length"
        class="flex justify-content-center align-items-center text-center line-height-3"
      >
        <div class="flex flex-column gap-3 align-items-center">
          <img
            class="w-10rem h-10rem object-fit-cover border-circle"
            :src="botVersatile?.image"
            onerror="this.onerror=null; this.src='/images/image-product-default.svg';"
          />
          <span class="text-center line-height-2">
            {{ botVersatile?.message }}
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
          :placeholder="botVersatile?.placeholder"
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
</template>
