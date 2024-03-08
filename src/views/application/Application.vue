<script setup>
import DATA from "@/services/data";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { isMobileScreen } from "@/utils";
import { STORE_APPLICATION } from "@/services/stores";
import ApplicationCard from "./components/ApplicationCard.vue";

const ROUTER = useRouter();

const {
  onGetterListBotVersatile: listBotVersatile,
  onActionGetListBotVersatile,
} = STORE_APPLICATION.StoreApplication();

const listApplication = computed(() => DATA.listApplication);

onMounted(() => {
  onActionGetListBotVersatile();
});
</script>

<template>
  <div class="flex h-full flex-column gap-3">
    <IconTitle icon="pi pi-th-large" title="Ứng dụng" />

    <div class="flex gap-3 flex-wrap">
      <div
        v-for="(app, index) in listApplication"
        :key="index"
        :style="{ width: isMobileScreen ? '30%' : '13%' }"
        :class="[
          `${
            isMobileScreen ? 'p-2' : 'p-3'
          } inline-flex flex-column align-items-center gap-2 card-bg border-round-lg on-click`,
        ]"
        @click="ROUTER.push({ name: app.routeName })"
      >
        <img
          :src="app.image"
          alt="Lỗi ảnh"
          class="w-3rem h-3rem object-fit-cover border-circle"
        />
        <span>{{ app.name }}</span>
      </div>

      <ApplicationCard
        v-for="(app, index) in listBotVersatile"
        :key="index"
        :id="app?._id"
        :image="app?.image"
        :name="app?.name"
      />
    </div>
  </div>
</template>
