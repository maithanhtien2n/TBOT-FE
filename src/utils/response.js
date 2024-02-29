import { isEmpty } from "@/utils";
import { ToastService } from "@/utils/toast";

export const Utils = () => {
  const TOAST = ToastService();

  const onResponse = async (value, showToast = false, messageToast) => {
    let results = [];
    if (!isEmpty(value)) {
      await value
        .then(({ data: res }) => {
          if (res.success) {
            if (!showToast) {
              results = res;
            } else {
              results = res;
              TOAST.success(messageToast ? messageToast : res.statusValue);
            }
          } else {
            TOAST.error(res.statusValue);
            results = res;
          }
        })
        .catch((error) => {
          if (error.response) {
            results = error.response.data;
            if (!["ERROR_BALANCE"].includes(error.response.data.statusCode)) {
              TOAST.error(error.response.data.statusValue);
            }

            return;
          }
          TOAST.error(error);
        });
    }
    return results;
  };

  return {
    TOAST,
    onResponse,
  };
};
