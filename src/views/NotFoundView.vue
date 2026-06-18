<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
</script>


<template>
  <div class ="error-page">
    <h1>404</h1>
    <h2>페이지를 찾을 수 없습니다.</h2>
    <p>입력하신 주소가 잘못되었거나, 영화 정보가 삭제되었습니다.</p>
    <button @click="router.push('/')" class="home-btn"> 메인으로 돌아가기</button>
  </div>
</template>

<style>
.error-page {
  text-align: center;
  padding : 100px 20px;
}

h1{
  font-size: 80px;
  margin: 0;
  color: #ff4757;
}
h2{
  font-size: 30px;
  margin-bottom: 20px;
}

.home-btn{
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
}
</style>