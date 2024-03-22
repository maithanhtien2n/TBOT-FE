<script setup>
import DATA from "@/services/data";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { STORE_APPLICATION, STORE_PERSONAL } from "@/services/stores";
import ApplicationCard from "./components/ApplicationCard.vue";
import {
  isMobileScreen,
  userData,
  appLocalStorage,
  onEncryptedData,
} from "@/utils";

const ROUTER = useRouter();

const {
  onGetterListBotVersatile: listBotVersatile,
  onActionGetListBotVersatile,
  onActionChangeModel,
} = STORE_APPLICATION.StoreApplication();

const { onActionGetUserInfo } = STORE_PERSONAL.StorePersonal();

const isUpgrade = ref(userData?.value?.isUpgrade);

const listApplication = computed(() => DATA.listApplication);

const onChangeModel = async ({ value }) => {
  const res = await onActionChangeModel(value);
  if (res.success) {
    onActionGetUserInfo(true).then((res) => {
      if (res.success) {
        appLocalStorage.value.userData = onEncryptedData(res?.data);
      }
    });
  }
};

onMounted(() => {
  onActionGetListBotVersatile();
});
</script>

<template>
  <div class="flex h-full flex-column gap-3">
    <IconTitle icon="pi pi-th-large" title="Ứng dụng" />

    <SelectButton
      v-model="isUpgrade"
      :options="[
        { name: 'Bản Bình thường', code: false },
        { name: 'Bản Nâng cấp', code: true },
      ]"
      optionLabel="name"
      optionValue="code"
      aria-labelledby="basic"
      @change="onChangeModel"
    />

    <div class="flex gap-3 flex-wrap">
      <div
        v-for="(app, index) in listApplication"
        :key="index"
        :style="{ width: isMobileScreen ? '30%' : '13%' }"
        :class="[
          `${
            isMobileScreen ? 'p-2' : 'p-3'
          } inline-flex flex-column align-items-center gap-2 card-bg border-round-lg on-click px-2 py-3`,
        ]"
        @click="ROUTER.push({ name: app.routeName })"
      >
        <img
          :src="app.image"
          alt="Lỗi ảnh"
          class="w-3rem h-3rem object-fit-cover border-circle"
        />
        <span style="font-size: 0.9rem" class="text-center">{{
          app.name
        }}</span>
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
