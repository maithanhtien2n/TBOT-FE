<template>
  <body>
    <div class="not-found-container">
      <div class="not-found-icon">404</div>
      <div class="not-found-text">Trang không tồn tại</div>
    </div>
  </body>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.not-found-container {
  text-align: center;
}

.not-found-icon {
  font-size: 100px;
  color: #f00;
}

.not-found-text {
  font-size: 24px;
  margin-top: 20px;
  color: #333;
}
</style>
