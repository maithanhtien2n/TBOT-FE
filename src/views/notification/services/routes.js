export default [
  {
    path: "notification",
    name: "Notification",
    component: () => import("../Notification.vue"),
  },
  {
    path: "notification/:id",
    name: "NotificationDetail",
    component: () => import("../NotificationDetail.vue"),
  },
];
