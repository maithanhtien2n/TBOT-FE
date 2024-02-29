<script setup>
import DATA from "@/services/data";
import { computed, onMounted } from "vue";
import IconTitle from "@/components/common/IconTitle.vue";
import ApplicationDocument from "./components/ApplicationDocument.vue";
import TopUpDocument from "./components/TopUpDocument.vue";
import QuestionCorner from "./components/QuestionCorner.vue";
import { STORE_HOME } from "@/services/stores";

const { onGetterDocument: document, onActionGetDocument } =
  STORE_HOME.StoreHome();

const tabMenu = computed(() => DATA.listMenuSession);

onMounted(() => {
  onActionGetDocument();
});
</script>

<template>
  <div class="flex h-full flex-column gap-3">
    <IconTitle icon="pi pi-book" title="Tài liệu ứng dụng" />

    <TabView>
      <TabPanel
        v-for="(menuItem, index) in tabMenu"
        :key="index"
        :header="menuItem.name"
      >
        <ApplicationDocument
          v-if="menuItem.code === 'ApplicationDocument'"
          :value="document?.application"
        />

        <TopUpDocument
          v-if="menuItem.code === 'TopUpDocument'"
          :value="document?.topUp"
        />

        <QuestionCorner v-if="menuItem.code === 'QuestionCorner'" />
      </TabPanel>
    </TabView>
  </div>
</template>
