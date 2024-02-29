import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";
import { API_QUESTION_ADMIN } from "@/services/api";

export const StoreQuestion = defineStore("StoreQuestion", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_QUESTION_ADMIN.API_QUESTION_ADMIN;

  // State
  const listQuestion = ref([]);

  // Getter
  const onGetterListQuestion = computed(() => listQuestion);

  // Action
  const onActionGetListQuestion = async (params, noLoading) => {
    const res = await onResponse(API.getListQuestion(params, noLoading));
    listQuestion.value = res.data;
    return res;
  };

  const onActionDeleteQuestion = async (id) => {
    const res = await onResponse(API.deleteQuestion(id), true);
    return res;
  };

  const onActionReplyQuestion = async (args) => {
    const res = await onResponse(API.replyQuestion(args), true);
    return res;
  };

  return {
    // Getter
    onGetterListQuestion,

    // Action
    onActionGetListQuestion,
    onActionDeleteQuestion,
    onActionReplyQuestion,
  };
});
