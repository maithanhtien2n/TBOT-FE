import { computed } from "vue";
import CryptoJS from "crypto-js";
import { io } from "socket.io-client";
import router from "@/services/router";
import { useStorage } from "@vueuse/core";
import { StoreApp } from "@/services/stores";

const socket = io(import.meta.env.VITE_BASE_URL);

const appLocalStorage = useStorage(
  "AppLocalStorage",
  {
    userData: "",
    // account: {
    //   _id: "",
    //   email: "",
    //   moneyBalance: 0,
    //   role: "",
    //   status: "",
    //   createdAt: "",
    //   updatedAt: "",
    // },
    // user: {
    //   _id: "",
    //   accountId: "",
    //   avatar: "",
    //   fullName: "",
    //   dateOfBirth: null,
    //   phoneNumber: "",
    //   gender: "",
    //   createdAt: "",
    //   updatedAt: "",
    // },
    accessToken: "",
  },
  localStorage,
  { mergeDefaults: true }
);

const decryptedData = computed(() => {
  if (appLocalStorage.value.userData) {
    try {
      return CryptoJS.AES.decrypt(
        appLocalStorage.value.userData,
        import.meta.env.VITE_BASE_JWT_SECRET
      ).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      onDeleteAppLocalStorage();
    }
  } else {
    return "";
  }
});

const userData = computed(() => {
  if (decryptedData.value) {
    return {
      ...JSON.parse(decryptedData.value)?.user,
      ...JSON.parse(decryptedData.value)?.account,
    };
  } else {
    return "";
  }
});

const accountId = computed(() => userData.value._id);
const accessToken = computed(() => appLocalStorage.value?.accessToken);

const onDeleteAppLocalStorage = () => {
  StoreApp().onActionLoadingActive(true, "Đang đăng xuất...");
  localStorage.removeItem("AppLocalStorage");

  appLocalStorage.value = {
    userData: "",
    accessToken: "",
  };

  router.replace({ name: "Home" });

  setTimeout(() => {
    StoreApp().onActionLoadingActive(false);
  }, 1000);
};

const isMobileScreen = computed(() => window.innerWidth < 500);

const isValidBase64 = (str) => {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
};

const isEmpty = (value) => {
  return (
    value === "" ||
    value === null ||
    value === undefined ||
    (Array.isArray(value) && !value.length) ||
    (!!value && value.constructor === Object && Object.keys(value).length === 0)
  );
};

const stringWithoutAccents = (value) => {
  if (!value) return value;
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d");
};

const formatDate = (dateString, showTime = false) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return showTime ? `${formattedDate} ${formattedTime}` : formattedDate;
};

const formatDateToDDMMYY = (timestamp) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Lưu ý rằng tháng bắt đầu từ 0
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
};

const formatToVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^0[0-9]{9}$/;
  return phoneRegex.test(phoneNumber);
};

const isValidName = (name) => {
  const nameRegex = /^[A-Za-zÀ-ỹ\s]{2,}$/;
  return nameRegex.test(name);
};

const onRenderStringBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const fileNameWithoutSpaces = file.name.split(" ").join("-");
      const fileNameLowercaseWithoutAccents = fileNameWithoutSpaces
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const fileBase64 = {
        name: fileNameLowercaseWithoutAccents,
        base64: reader.result.split(",")[1],
      };
      resolve(fileBase64);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const onCopyText = (text) => {
  // Tạo một vùng chứa (textarea) ẩn để chứa văn bản cần sao chép
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea); // Thêm textarea vào body

  // Chọn văn bản trong textarea và sao chép vào clipboard
  textarea.select();
  document.execCommand("copy");

  // Loại bỏ textarea đã tạo ra khỏi DOM
  document.body.removeChild(textarea);
};

const onValidAccountName = (accountName) => {
  // Kiểm tra xem tên tài khoản có ít nhất 6 ký tự
  // và chứa ít nhất một số, và không viết hoa
  const regex = /^(?=.*\d)(?=.*[a-z])[a-z0-9]{6,}$/;
  return regex.test(accountName);
};

const onValidPassword = (password) => {
  // Kiểm tra xem mật khẩu có ít nhất 6 ký tự,
  // bao gồm ít nhất một số và một ký tự đặc biệt
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{6,}$/;
  return regex.test(password);
};

const formatNumberIntl = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

const convertNewline = (inputString) => {
  return inputString.replace(/\\n/g, "\n");
};

const onEncryptedData = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    import.meta.env.VITE_BASE_JWT_SECRET
  ).toString();
};

const isValidEmail = (email) => {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

const isValidFormat = (input) => {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng "số, năm"
  const regex = /^\d{1,2}, \d{4}$/;
  if (!regex.test(input)) {
    return "Ngày tháng chưa định dạng (tháng, năm)"; // Không đúng định dạng
  }

  // Tách số tháng và năm từ chuỗi
  const [month, year] = input.split(", ");

  // Lấy thông tin về tháng và năm hiện tại
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0

  // Kiểm tra xem số tháng và năm có lớn hơn hiện tại hay không
  if (
    parseInt(year, 10) > currentYear ||
    (parseInt(year, 10) === currentYear && parseInt(month, 10) > currentMonth)
  ) {
    return "Ngày tháng không được lớn hơn thời điểm hiện tại";
  }

  return ""; // Đúng định dạng và giá trị hợp lệ
};

const getCurrentMonthYear = () => {
  const currentDate = new Date();

  // Lấy tháng và năm hiện tại
  const currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
  const currentYear = currentDate.getFullYear();

  // Định dạng theo "tháng, năm"
  const formattedDate = `${currentMonth}, ${currentYear}`;

  return formattedDate;
};

const isValidDateOfBirth = (input) => {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng "dd/mm/yyyy"
  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

  // Kiểm tra xem chuỗi đầu vào có khớp với biểu thức chính quy không
  const match = input.match(regex);

  if (!match) {
    return false; // Không đúng định dạng
  }

  // Lấy các giá trị từ match
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  // Kiểm tra xem ngày, tháng, năm có hợp lệ không
  const isValidDate =
    !isNaN(day) &&
    !isNaN(month) &&
    !isNaN(year) &&
    day >= 1 &&
    day <= 31 &&
    month >= 1 &&
    month <= 12 &&
    year >= 1900 &&
    year <= new Date().getFullYear();

  return isValidDate;
};

export {
  isEmpty,
  onCopyText,
  formatDate,
  isValidName,
  formatToVND,
  isValidEmail,
  isValidBase64,
  isValidFormat,
  convertNewline,
  onValidPassword,
  onEncryptedData,
  formatNumberIntl,
  formatDateToDDMMYY,
  onValidAccountName,
  isValidDateOfBirth,
  isValidPhoneNumber,
  getCurrentMonthYear,
  stringWithoutAccents,
  onRenderStringBase64,
  onDeleteAppLocalStorage,
  // ------------- //
  socket,
  userData,
  accountId,
  accessToken,
  isMobileScreen,
  appLocalStorage,
};
