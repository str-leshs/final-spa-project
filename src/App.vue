<script setup>
</script>

<template>
  <div class="app-container">
    <header class="navbar">
      <div class="logo">🍿 SPA Movie</div>
      <nav class="links">
        <router-link to="/">홈(HOME)</router-link>
        <router-link to="/movies">영화 목록(Movies)</router-link>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .app-container {
    font-family: sans-serif;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background-color: #2c3e50;
    color: white;
  }
  .logo{
    font-size: 24px;
    font-weight: bold;
  }
  .links {
    display: flex;
    gap: 20px;
  }
  .links a {
    color: #a1b1c1;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
  }

  .links a.router-link-active {
    color: #42b883;
    text-decoration: underline;
  }
</style>
