import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";
import { API_HOME } from "@/services/api";

export const StoreHome = defineStore("StoreHome", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_HOME.API_HOME;

  // State
  const document = ref({});
  const listQuestion = ref([]);

  // Getter
  const onGetterDocument = computed(() => document);
  const onGetterListQuestion = computed(() => listQuestion);

  // Action
  const onActionGetDocument = async (noLoading) => {
    const res = await onResponse(API.getDocument(noLoading));
    document.value = res.data;
    return res;
  };

  const onActionGetListQuestion = async (params, noLoading) => {
    const res = await onResponse(API.getListQuestion(params, noLoading));
    listQuestion.value = res.data;
    return res;
  };

  const onActionSendContent = async (args) => {
    const res = await onResponse(API.sendContent(args));
    return res;
  };

  return {
    // Getter
    onGetterDocument,
    onGetterListQuestion,

    // Action
    onActionGetDocument,
    onActionGetListQuestion,
    onActionSendContent,
  };
});
