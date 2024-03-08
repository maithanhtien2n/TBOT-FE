import RoutesVirtualAssistant from "../virtual-assistant/services/routes";
import RoutesBotImage from "../bot-image/services/routes";
import RoutesBotAudio from "../bot-audio/services/routes";
import RoutesBotVersatile from "../bot-versatile/services/routes";

export default [
  {
    path: "app",
    name: "Application",
    component: () => import("../Application.vue"),
  },
  {
    path: "app",
    name: "ApplicationDetail",
    component: () => import("../ApplicationDetail.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      ...RoutesVirtualAssistant,
      ...RoutesBotImage,
      ...RoutesBotAudio,
      ...RoutesBotVersatile,
    ],
  },
];
