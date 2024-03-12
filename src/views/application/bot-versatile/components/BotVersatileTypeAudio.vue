<script setup>
import { isMobileScreen, convertAudioToText } from "@/utils";
import { STORE_APPLICATION } from "@/services/stores";
import { computed, ref } from "vue";

const props = defineProps({
  botVersatile: { type: Object, required: true },
});

const { onGetterMessages: messages, onActionSendMessage } =
  STORE_APPLICATION.STORE_BOT_VERSATILE.StoreBotVersatile();

const audioPlayer = ref(null);
const recording = ref(false);
let mediaRecorder = null;
let audioChunks = [];

const botVersatile = computed(() => props.botVersatile);

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

      convertAudioToText(audioBlob).then((res) => {
        console.log(res);
      });

      const audioUrl = URL.createObjectURL(audioBlob);
      audioPlayer.value.src = audioUrl;
    };

    mediaRecorder.start();
    recording.value = true;
  } catch (error) {
    console.error("Lỗi khi truy cập microphone: ", error);
  }
};

const stopRecording = () => {
  if (mediaRecorder && recording.value) {
    mediaRecorder.stop();
    recording.value = false;
  }
};
</script>

<template>
  <div class="w-full flex flex-column h-full">
    <div
      style="max-width: 52rem"
      :class="[
        'flex flex-1 flex-column gap-3 m-auto w-full pt-3 align-items-center justify-content-center',
        {
          'px-3': !isMobileScreen,
        },
      ]"
    >
      <img
        :src="botVersatile?.image"
        onerror="this.onerror=null; this.src='/images/image-product-default.svg';"
        class="w-10rem h-10rem object-fit-cover"
      />

      <audio ref="audioPlayer" controls></audio>

      <Button label="Bắt đầu" @click="startRecording" />
      <Button label="Dừng lại" severity="danger" @click="stopRecording" />
    </div>
  </div>
</template>
