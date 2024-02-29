<script setup>
import { useRouter } from "vue-router";

const ROUTER = useRouter();
</script>

<template>
  <div class="w-full h-screen flex justify-content-center align-items-center">
    <div class="container">
      <h1>Yêu Cầu Nạp Tiền</h1>
      <p class="line-height-2 mt-2">
        Để sử dụng tính năng này, bạn cần nạp tiền vào tài khoản của mình.
      </p>
      <a class="back-btn on-click" @click="ROUTER.replace({ name: 'Home' })">
        Quay lại trang chủ
      </a>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
}

h1 {
  color: #333;
}

p {
  color: #777;
}

.back-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4285f4;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 20px;
}

.back-btn:hover {
  background-color: #2d5ea3;
}
</style>
