<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { STORE_APPLICATION } from "@/services/stores";
import {
  isMobileScreen,
  blobToBase64,
  socket,
  onRenderStringBase64,
} from "@/utils";

const ROUTE = useRoute();

const props = defineProps({
  botVersatile: { type: Object, required: true },
});

const { onGetterMessages: messages, onActionSendMessage } =
  STORE_APPLICATION.STORE_BOT_VERSATILE.StoreBotVersatile();

const recording = ref(false);
let mediaRecorder = null;
let audioChunks = [];
const fileAudio = ref(null);

const fileError = ref("");

const botVersatile = computed(() => props.botVersatile);
const botVersatileId = computed(() => ROUTE.params.id);

const onSend = async (audioBase64) => {
  messages.value.push({ role: "user", content: audioBase64 });

  const res = await onActionSendMessage({
    typeResponse: "audio",
    botVersatileId: botVersatileId.value,
    messages: messages.value.map(({ role, content }) => ({
      role,
      content,
    })),
  });

  if (res.success) {
    messages.value.pop();
    res.data.forEach((item) => {
      messages.value.push(item.result);
    });

    console.log(messages.value);
    socket.emit("isNewData", "Dữ liệu mới");
  } else {
    messages.value = [];
  }
};

const onUploadFile = async (event) => {
  const fileType = ["mp3", "wav"];
  if (
    !fileType.T.includes(
      event.target.files[0].name.split(".").pop().toLowerCase()
    )
  ) {
    fileError.value = `Chỉ hỗ trợ tệp có đuôi: ${fileType.join(", ")}`;
    return;
  }

  if (+event.target.files[0].size > 3145728) {
    fileError.value = "Kích thước tệp không được vượt quá 3MB";
    return;
  }

  const file = await onRenderStringBase64(event.target.files[0], false);
  fileAudio.value = file;
  onSend(file.base64);

  // Reset the input
  const inputFile = document.getElementById("inputFile");
  inputFile.value = "";
  fileError.value = "";
};

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

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/WAV" });
      const audioBase64 = await blobToBase64(URL.createObjectURL(audioBlob));
      onSend(audioBase64);
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
        'flex flex-1 flex-column gap-6 m-auto w-full pt-3 align-items-center justify-content-center',
        {
          'px-3': !isMobileScreen,
        },
      ]"
    >
      <img
        :src="botVersatile?.image"
        onerror="this.onerror=null; this.src='/images/image-product-default.svg';"
        class="w-13rem h-13rem object-fit-cover"
      />

      <div class="fixed" style="left: 100%">
        <audio v-for="(a, index) in messages" :key="index" controls autoplay>
          <source :src="a.content" type="audio/mp3" />
        </audio>
      </div>

      <div class="flex flex-column gap-2 align-items-center">
        <div class="flex align-items-center gap-2">
          <span>Thêm tệp tin</span>

          <div style="overflow: hidden" class="relative">
            <i class="pi pi-plus-circle on-click text-800" />
            <input
              type="file"
              id="inputFile"
              class="absolute top-0 right-0 left-0 bottom-0 opacity-0 on-click"
              accept=".mp3,wav"
              @change="onUploadFile"
            />
          </div>
        </div>

        <small v-show="fileError" class="p-error">
          {{ fileError }}
        </small>

        <div
          v-if="fileAudio"
          class="card-bg-mini inline-flex align-items-center gap-1"
        >
          <span class="text-700">{{ fileAudio.name }}</span>
          <i class="pi pi-times-circle text-700" @click="fileAudio = null" />
        </div>
        <div v-else class="card-bg-mini inline-flex align-items-center gap-1">
          <span class="text-700">Chưa có file nào</span>
        </div>
      </div>

      <Button v-if="!recording" label="Bắt đầu" @click="startRecording" />
      <Button
        v-else
        label="Dừng lại"
        severity="danger"
        @click="stopRecording"
      />
    </div>
  </div>
</template>
