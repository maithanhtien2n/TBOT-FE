export default {
  listMenu: [
    {
      name: "Trang chủ",
      icon: "pi-home",
      route: {
        name: "Home",
        params: null,
        query: null,
      },
      isPC: true,
    },
    {
      name: "Ví ngân lượng",
      icon: "pi-wallet",
      route: {
        name: "MoneyWallet",
        params: null,
        query: null,
      },
      isPC: false,
    },
    {
      name: "Ứng dụng",
      icon: "pi-th-large",
      route: {
        name: "Application",
        params: null,
        query: null,
      },
      isPC: true,
    },
    {
      name: "Thông báo",
      icon: "pi-bell",
      route: {
        name: "Notification",
        params: null,
        query: null,
      },
      isPC: false,
    },
    {
      name: "Trang cá nhân",
      icon: "pi-user",
      route: {
        name: "Personal",
        params: null,
        query: null,
      },
      isPC: false,
    },
  ],

  listMenuSession: [
    {
      name: "Ứng dụng",
      code: "ApplicationDocument",
      icon: "pi-tablet",
    },
    {
      name: "Nạp tiền",
      code: "TopUpDocument",
      icon: "pi-dollar",
    },
    {
      name: "Góc thắc mắc",
      code: "QuestionCorner",
      icon: "pi-question-circle",
    },
  ],

  listApplication: [
    {
      name: "Trợ lý ảo",
      image: "/images/botai-main.png",
      routeName: "VirtualAssistant",
    },
    {
      name: "Tạo ảnh AI",
      image: "/images/create-image-ai.jpg",
      routeName: "BotImage",
    },
    {
      name: "Giọng đọc AI",
      image: "/images/audio-ai.jpeg",
      routeName: "BotAudio",
    },
  ],

  listMenuAdmin: [
    {
      name: "Trang chủ",
      icon: "pi-home",
      routeName: "HomeAdmin",
    },
    {
      name: "Tài khoản",
      icon: "pi-users",
      routeName: "AccountAdmin",
    },
    {
      name: "Ứng dụng",
      icon: "pi-th-large",
      routeName: "ApplicationAdmin",
    },
    {
      name: "Thông báo",
      icon: "pi-bell",
      routeName: "NotificationAdmin",
    },
    {
      name: "Lịch sử nạp tiền",
      icon: "pi-history",
      routeName: "TopUpHistoryAdmin",
    },
    {
      name: "Tài liệu ứng dụng",
      icon: "pi-book",
      routeName: "DocumentAdmin",
    },
    {
      name: "Câu hỏi của người dùng",
      icon: "pi-question-circle",
      routeName: "QuestionAdmin",
    },
  ],
};
