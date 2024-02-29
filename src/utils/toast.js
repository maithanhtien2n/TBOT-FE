import { useToast } from "primevue/usetoast";

export const ToastService = () => {
  const toast = useToast();

  const success = (content = "") =>
    toast.add({
      severity: "success",
      summary: "Thành công",
      detail: content,
      life: 3000,
    });

  const info = (content = "", summary = "Thông tin") =>
    toast.add({
      severity: "info",
      summary: summary,
      detail: content,
      life: 3000,
    });

  const warn = (content = "") =>
    toast.add({
      severity: "warn",
      summary: "Cảnh báo",
      detail: content,
      life: 3000,
    });

  const error = (content = "") =>
    toast.add({
      severity: "error",
      summary: "Lỗi",
      detail: content,
    });

  return {
    success,
    info,
    warn,
    error,
  };
};
