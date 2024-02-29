<script setup>
import { onMounted, ref } from "vue";
import { STORE_HOME } from "@/services/stores";
import { userData, accessToken, isMobileScreen } from "@/utils";
import UserCard from "@/components/common/UserCard.vue";

const {
  onGetterListQuestion: listQuestion,
  onActionGetListQuestion,
  onActionSendContent,
} = STORE_HOME.StoreHome();

const sendContent = ref("");
const selectedRegime = ref("EVERY_BODY");
const isSending = ref(false);

const onChangRegime = (regime) => {
  onActionGetListQuestion(regime, true);
};

const onSendQuestion = async (content) => {
  if (isSending.value || !content) {
    return;
  }

  const question = content;
  sendContent.value = "";
  isSending.value = true;

  const res = await onActionSendContent({ question });
  if (res.success) {
    await onActionGetListQuestion(selectedRegime.value, true);

    isSending.value = false;
  }
};

onMounted(() => {
  onActionGetListQuestion(selectedRegime.value);
});
</script>

<template>
  <div
    style="max-width: 37rem"
    :class="['flex flex-column gap-3', { 'card-bg': isMobileScreen }]"
  >
    <div v-if="accessToken" class="flex flex-column gap-3">
      <div
        :class="[
          `flex flex-column gap-2 ${isMobileScreen ? 'w-full' : 'w-10rem'}`,
        ]"
      >
        <span>Chế độ xem</span>
        <Dropdown
          v-model="selectedRegime"
          :options="[
            { name: 'Mọi người', code: 'EVERY_BODY' },
            { name: 'Của tôi', code: 'PERSONAL' },
          ]"
          optionLabel="name"
          optionValue="code"
          class="w-full"
          @change="onChangRegime(selectedRegime)"
        />
      </div>

      <div class="flex flex-column gap-2">
        <span>Hãy đặt câu hỏi, chúng tôi sẽ giải đáp!</span>

        <div
          style="padding: 0.9rem; border-radius: 1rem"
          class="w-full border-round-3xl flex box-shadow-1 bg-white"
        >
          <input
            v-model="sendContent"
            type="text"
            class="w-full border-none outline-none bg-transparent text-800"
            placeholder="Bạn muốn hỏi gì?"
            @keypress.enter="onSendQuestion(sendContent)"
          />

          <i v-if="isSending" class="pi pi-spin pi-spinner text-900" />

          <i
            v-else
            style="border-left: 1px solid #ddd"
            :class="[
              'pi pi-angle-right pl-2 text-700 on-click',
              { 'p-disabled': !sendContent },
            ]"
            @click="onSendQuestion(sendContent)"
          />
        </div>
      </div>
    </div>

    <UserCard
      v-if="isSending"
      :value="{
        avatar: userData?.avatar || '/images/avatar.jpg',
        fullName: userData?.fullName,
        sentDate: '',
        content: 'đang gửi câu hỏi...',
      }"
    />

    <div
      v-for="(item, index) in listQuestion"
      :key="index"
      class="flex flex-column gap-2"
    >
      <UserCard :value="item?.question" />

      <UserCard
        v-if="item?.answer"
        :value="{
          avatar: '/images/avatar-admin.jpg',
          fullName: 'Quản trị viên',
          sentDate: item?.answer?.sentDate,
          content: item?.answer?.content,
        }"
        style="padding: 0.6rem 0.6rem 0.2rem 0.6rem"
        :class="['card-bg', { 'bg-white': isMobileScreen }]"
      />
    </div>

    <div v-if="!listQuestion?.length" class="text-center py-7">
      Chưa có câu hỏi nào.
    </div>
  </div>
</template>
