import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";
import { API_DOCUMENT_ADMIN } from "@/services/api";

export const StoreDocumentAdmin = defineStore("StoreDocumentAdmin", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_DOCUMENT_ADMIN.API_DOCUMENT_ADMIN;

  // State
  const document = ref([]);

  // Getter
  const onGetterDocument = computed(() => document);

  // Action
  const onActionGetDocument = async (noLoading) => {
    const res = await onResponse(API.getDocument(noLoading));
    document.value = res.data;
    return res;
  };

  const onActionSaveDocument = async (args) => {
    const res = await onResponse(API.saveDocument(args), true);
    return res;
  };

  return {
    // Getter
    onGetterDocument,

    // Action
    onActionGetDocument,
    onActionSaveDocument,
  };
});
