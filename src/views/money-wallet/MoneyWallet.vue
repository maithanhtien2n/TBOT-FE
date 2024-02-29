<script setup>
import { onMounted } from "vue";
import IconTitle from "@/components/common/IconTitle.vue";
import { STORE_MONEY_WALLET } from "@/services/stores";
import { userData, formatToVND, accountId, formatDate } from "@/utils";

const { onGetterTopUpHistory: events, onActionGetTopUpHistory } =
  STORE_MONEY_WALLET.StoreMoneyWallet();

onMounted(() => {
  onActionGetTopUpHistory();
});
</script>

<template>
  <div class="flex h-full flex-column gap-3">
    <IconTitle icon="pi pi-wallet" title="Ví ngân lượng" />

    <div class="flex h-full flex-column gap-3">
      <span class="card-bg text-800"
        >Số dư hiện tại: {{ formatToVND(userData.moneyBalance) }}</span
      >

      <div class="card-bg h-full flex flex-column gap-3">
        <span class="text-800">Lịch sử nạp tiền:</span>
        <Timeline v-if="events?.length" :value="events">
          <template #content="slotProps">
            <div class="flex flex-column gap-1">
              <span class="text-800">
                {{ formatToVND(slotProps.item.moneyNumber) }}
              </span>
              <span class="text-800 text-custom-mini">
                {{ formatDate(slotProps.item.createdAt, true) }}
              </span>
            </div>
          </template>
        </Timeline>

        <div
          v-else
          class="flex-1 flex flex-column gap-3 justify-content-center align-items-center"
        >
          <i class="pi pi-history text-2xl text-800" />
          <span class="text-800">Chưa có lịch sử nạp tiền.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
