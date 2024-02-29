<script setup>
import { useRouter } from "vue-router";
import { accessToken, accountId } from "@/utils";

const props = defineProps({
  icon: { type: String, required: false, default: "" },
  isSelect: { type: Boolean, required: false, default: false },
  route: {
    type: Object,
    required: false,
    default: () => {
      return { name: null, params: null, query: null };
    },
  },
  notification: {
    type: Object,
    required: false,
    default: () => {
      return {
        color: "rgb(245, 58, 58)",
        amount: 0,
        isShow: false,
      };
    },
  },
});

const ROUTER = useRouter();

const onCustomRoute = (route) => {
  let routeClone = route;

  switch (route.name) {
    case "VirtualAssistant":
      routeClone.params = {
        accountId: accessToken.value ? accountId.value : "#",
      };
      return routeClone;
    default:
      return route;
  }
};

const onClickButtonIcon = (route = { name: "", params: null, query: null }) => {
  ROUTER.push({ name: route.name, params: route.params, query: route.query });
};
</script>

<template>
  <div class="relative on-click">
    <i
      style="background-color: rgb(245, 245, 245); font-size: 1.1rem"
      :class="[
        `pi ${icon} text-700 border-circle avatar flex align-items-center justify-content-center`,
        { 'active-item': isSelect },
      ]"
      @click="onClickButtonIcon(onCustomRoute(route))"
    />

    <span
      v-if="notification.amount && notification.isShow"
      style="font-size: 0.8rem"
      :style="{ backgroundColor: notification.color }"
      class="absolute top-0 right-0 w-1rem h-1rem flex align-items-center justify-content-center border-circle text-white"
    >
      {{ notification.amount }}
    </span>
  </div>
</template>

<style scoped>
.active-item {
  color: #10b981 !important;
}
</style>
