<script setup>
import { STORE_CATEGORY } from "@/services/stores";
import { DATA_VIRTUAL_ASSISTANT } from "../services/data";
import { computed, ref, watch } from "vue";

const props = defineProps({
  type: { type: String, required: false, default: "" },
});

const {
  onGetterVirtualAssistant: virtualAssistant,
  onActionGetVirtualAssistant,
  onActionSaveVirtualAssistant,
} = STORE_CATEGORY.StoreVirtualAssistant();

const description = ref("");

const onReturnTile = computed(
  () =>
    DATA_VIRTUAL_ASSISTANT.listMenu.find(({ code }) => code === props.type).name
);

const onClickSave = async (code, value) => {
  let req = {
    userId: "65817bdbdbfb9992f84884a8",
  };
  switch (code) {
    case "BOT_TRAINING":
      req.system = value;
      break;
    case "TASKS_OF_BOT":
      req.assistant = value;
      break;
    default:
      req.system = {};
      break;
  }

  const res = await onActionSaveVirtualAssistant(req);
  if (res.success) onActionGetVirtualAssistant("65817bdbdbfb9992f84884a8");
};

watch(
  () => props.type,
  (code) => {
    switch (code) {
      case "BOT_TRAINING":
        description.value = virtualAssistant.value.system;
        break;
      case "TASKS_OF_BOT":
        description.value = virtualAssistant.value.assistant;
        break;
      default:
        description.value = "";
        break;
    }
  }
);

watch(virtualAssistant, (value) => {
  if (props.type === "BOT_TRAINING") {
    description.value = value.system;
  }
});
</script>

<template>
  <div class="flex-1 pl-3 flex flex-column gap-2">
    <div class="flex justify-content-between align-items-end">
      <span>{{ onReturnTile }}</span>
      <button
        style="color: #fff; padding: 0.6rem 1.3rem"
        class="border-none on-click bg-main-color"
        @click="onClickSave(type, description)"
      >
        Lưu
      </button>
    </div>

    <div class="flex-1">
      <Editor v-model="description" style="height: 70%">
        <template v-slot:toolbar>
          <span class="ql-formats">
            <button v-tooltip.bottom="'Bold'" class="ql-bold" />
            <button v-tooltip.bottom="'Italic'" class="ql-italic" />
            <button v-tooltip.bottom="'Underline'" class="ql-underline" />
          </span>
        </template>
      </Editor>
    </div>
  </div>
</template>
