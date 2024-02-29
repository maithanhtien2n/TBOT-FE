export default [
  {
    path: "virtual-assistant",
    name: "VirtualAssistant",
    component: () => import("../VirtualAssistant.vue"),
  },
  {
    path: "virtual-assistant/config",
    name: "VirtualAssistantConfig",
    component: () => import("../VirtualAssistantConfig.vue"),
  },
  {
    path: "virtual-assistant/chat",
    name: "VirtualAssistantChat",
    component: () => import("../VirtualAssistantChat.vue"),
  },
];
