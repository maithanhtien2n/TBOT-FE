<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { STORE_APPLICATION } from "@/services/stores";
import BotVersatileTypeText from "./components/BotVersatileTypeText.vue";
import BotVersatileTypeAudio from "./components/BotVersatileTypeAudio.vue";

const ROUTE = useRoute();
const ROUTER = useRouter();

const { onGetterBotVersatile: botVersatile, onActionGetVersatile } =
  STORE_APPLICATION.STORE_BOT_VERSATILE.StoreBotVersatile();

const botVersatileId = computed(() => ROUTE.params.id);

onMounted(async () => {
  onActionGetVersatile(botVersatileId.value);
});
</script>

<template>
  <div class="relative flex flex-column h-full">
    <ButtonBack @onBack="ROUTER.push({ name: 'Application' })" />

    <BotVersatileTypeText
      v-if="botVersatile.type === 'TEXT'"
      :botVersatile="botVersatile"
    />

    <BotVersatileTypeAudio
      v-if="botVersatile.type === 'AUDIO'"
      :botVersatile="botVersatile"
    />
  </div>
</template>
