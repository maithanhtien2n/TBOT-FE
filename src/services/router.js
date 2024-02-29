import App from "@/App.vue";
import { userData, accessToken } from "@/utils";
import { createRouter, createWebHistory } from "vue-router";

// Client
import RoutesHome from "@/views/home/services/routes";
import RoutesPersonal from "@/views/personal/services/routes";
import RoutesApplication from "@/views/application/services/routes";
import RoutesMoneyWallet from "@/views/money-wallet/services/routes";
import RoutesNotification from "@/views/notification/services/routes";

// Admin
import RoutesHomeAdmin from "@/admin-views/home-admin/services/routes";
import RoutesAccountAdmin from "@/admin-views/account/services/routes";
import RoutesNotificationAdmin from "@/admin-views/notification-admin/services/routes";
import RoutesTopUpHistoryAdmin from "@/admin-views/topup-history-admin/services/routes";
import RoutesQuestionAdmin from "@/admin-views/question-admin/services/routes";
import RoutesDocumentAdmin from "@/admin-views/document-admin/services/routes";

const routes = [
  {
    path: "",
    name: "App",
    component: App,
    meta: {
      requiresAuth: true,
    },
    children: [
      ...RoutesHome,
      ...RoutesPersonal,
      ...RoutesApplication,
      ...RoutesMoneyWallet,
      ...RoutesNotification,
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/Admin.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      ...RoutesHomeAdmin,
      ...RoutesAccountAdmin,
      ...RoutesNotificationAdmin,
      ...RoutesTopUpHistoryAdmin,
      ...RoutesQuestionAdmin,
      ...RoutesDocumentAdmin,
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/otp-authentication",
    name: "OtpAuthentication",
    component: () => import("@/pages/OtpAuthentication.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/Register.vue"),
  },
  {
    path: "/required-topup",
    name: "RequiredTopUp",
    component: () => import("@/pages/RequiredTopUp.vue"),
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: () => import("@/pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  window.scrollTo(0, 0);

  if (!to.name || !router.hasRoute(to.name)) {
    return next({ name: "NotFound" });
  }

  try {
    if (accessToken.value) {
      const isPathAdmin = to.fullPath.split("/")[1] === "admin";
      const isRoleAdmin = ["ADMIN"].includes(userData.value.role);

      if (to.name === "Login") {
        if (isRoleAdmin) {
          return next({ name: "HomeAdmin" });
        } else {
          return next({ name: "Home" });
        }
      }

      if (isPathAdmin) {
        if (isRoleAdmin) {
          next();
        } else {
          return next({ name: "NotFound" });
        }
      } else {
        if (!isRoleAdmin) {
          next();
        } else {
          return next({ name: "HomeAdmin" });
        }
      }
    } else {
      if (
        to.name !== "Login" &&
        to.name !== "Register" &&
        to.name !== "Home" &&
        to.name !== "NotFound" &&
        to.name !== "VirtualAssistantChat" &&
        to.name !== "OtpAuthentication"
      ) {
        return next({ name: "Login" });
      }
      next();
    }
  } catch (error) {
    if (to.name === "Register") {
      next();
    }
    return next({ name: "Login" });
  }
});

export default router;
