import { AxiosInstance } from "@/services/api";

class ApiQuestionAdmin {
  getListQuestion = async (params, noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `question/admin`,
      params,
      noLoading,
    });
  };

  deleteQuestion = async (questionId) => {
    return await AxiosInstance({
      method: "DELETE",
      url: `question/${questionId}`,
    });
  };

  replyQuestion = async ({ questionId, answer }) => {
    return await AxiosInstance({
      method: "PUT",
      url: `question/${questionId}`,
      data: { answer },
    });
  };
}

export const API_QUESTION_ADMIN = new ApiQuestionAdmin();
