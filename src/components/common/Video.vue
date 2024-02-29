<script setup>
const props = defineProps({
  value: { type: String, required: false, default: "" },
  width: { type: String, required: false, default: "" },
  height: { type: String, required: false, default: "" },
});
</script>

<template>
  <div class="video-container">
    <video controls :style="{ width: `${width}`, height: `${height}` }">
      <source :src="value" type="video/mp4" />
    </video>
  </div>
</template>

<style scoped>
.video-container {
  width: 100%; /* hoặc kích thước mong muốn */
  max-width: 800px; /* giới hạn kích thước tối đa */
  margin: 0 auto; /* căn giữa video trên trang */
}

.video-container video {
  width: 100%; /* làm cho video chiếm toàn bộ khối chứa */
  height: auto; /* tự động điều chỉnh chiều cao theo tỷ lệ khung hình của video */
}

.video-container video {
  border: 5px solid #ccc; /* màu và độ rộng của viền */
  border-radius: 15px; /* bo tròn góc */
}

/* Màu nền cho control bar */
.video-container video::-webkit-media-controls {
  background-color: rgba(0, 0, 0, 0.5); /* màu nền với độ trong suốt */
}

/* Màu chữ và icon trên control bar */
.video-container video::-webkit-media-controls-enclosure {
  color: #fff; /* màu chữ trắng */
}
</style>
