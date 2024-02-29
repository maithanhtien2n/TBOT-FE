export default [
  {
    path: "notification",
    name: "NotificationAdmin",
    component: () => import("../NotificationAdmin.vue"),
  },
  {
    path: "notification/:id",
    name: "NotificationDetailAdmin",
    component: () => import("../NotificationDetailAdmin.vue"),
  },
];
