import { AxiosInstance } from "@/services/api";

class ApiDocumentAdmin {
  getDocument = async (noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `document`,
      noLoading,
    });
  };

  saveDocument = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `document`,
      data: {
        documentId: args?._id || "",
        application:
          args?.application.video + "$" + args?.application.content || "",
        topUp: args?.topUp || "",
      },
    });
  };
}

export const API_DOCUMENT_ADMIN = new ApiDocumentAdmin();
