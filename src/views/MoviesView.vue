<script setup>
  import { ref } from 'vue';
  import { useFavoritesStore } from '../stores/favorites.js';

  const favoritesStore = useFavoritesStore();

  const movies = ref ([
    {id: 1, title: '인셉션', rating: 9.5},
    {id: 2, title: '어바웃타임', rating: 9.2},
    {id: 3, title: '인터스텔라', rating: 9.8},
    {id: 4, title: '조커', rating: 8.9}

  ])
</script>

<template>
  <main class="page">
    <div class="header-area">
      <h1>영화 목록</h1>
      <button @click="favoritesStore.clearAllFavorites" class="clear-btn">
      🗑️ 찜 목록 전체 비우기
      </button>
    </div>
    <ul>
      <li v-for="movie in movies" :key="movie.id" class="movie-item">
        <span class="movie-info">{{  movie.title }} (⭐ {{ movie.rating }})</span>
        <button @click="favoritesStore.toggleFavorite(movie)" class="fav-btn">
          {{ favoritesStore.favoriteMovies.some(m => m.id === movie.id) ? '🩷 찜 취소' : '🤍 찜하기' }}
        </button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
  .page { 
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  }
  .header-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  .movie-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #ddd;
    font-size: 19px;
  }
  .fav-btn{
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #ffdde1;
    font-weight: bold;
    transition: 0.2s;
  }
  .fav-btn:hover {
    background-color: #ffc0cb;
  }
  .clear-btn {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #555;
    color: white;
    font-weight: bold;
  }
  .clear-btn:hover {
    background-color: #333;
  }
</style>