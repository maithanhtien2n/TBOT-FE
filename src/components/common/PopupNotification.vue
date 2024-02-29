<script setup>
import { useRouter } from "vue-router";
import { StoreApp } from "@/services/stores";

const ROUTER = useRouter();

const { onActionPopupNotification, onGetterPopupInfo: popupInfo } = StoreApp();
</script>

<template>
  <Dialog
    v-model:visible="popupInfo.display"
    modal
    :header="popupInfo?.title || 'Thông báo'"
    class="w-30rem"
  >
    <div class="flex flex-column gap-3 align-items-center pb-2">
      <i
        v-if="popupInfo?.icon === 'error'"
        style="color: rgb(201, 21, 45)"
        class="pi pi-info-circle text-3xl"
      />

      <i v-else style="color: green" class="pi pi-check-circle text-3xl" />

      <div class="flex flex-column gap-2">
        <span
          v-if="popupInfo?.content1"
          :class="{ 'p-error': popupInfo.icon === 'error' }"
          class="text-center line-height-2"
        >
          {{ popupInfo?.content1 }}
        </span>

        <span
          v-if="popupInfo?.content2"
          class="text-center text-main-color line-height-2 on-click"
          @click="
            () => {
              if (popupInfo?.action) {
                ROUTER.push({ name: popupInfo?.action });
                onActionPopupNotification({ display: false });
              }
            }
          "
        >
          {{ popupInfo?.content2 }}
        </span>

        <span v-if="!popupInfo?.content1 && !popupInfo?.content2">
          Không có nội dung nào.
        </span>
      </div>
    </div>
  </Dialog>
</template>
