import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useMovieStore = defineStore('movie', () => {
  const movies = ref([]);
  const favorites = ref(JSON.parse(sessionStorage.getItem('favorites')) || []);
  const isLoading = ref(false);
  const errorMessage = ref('');

  const fetchMovies = async () => {
    isLoading.value = true;
    errorMessage.value = '';

    try {
      const API_KEY = '82f60caa707dcf958839d621bcbab16d';

      const movieParams = {
        api_key: API_KEY,
        language: 'ko-KR',
        region: 'KR',
        sort_by: 'popularity.desc',
        include_adult: false,
        'release_date.gte': '2025-01-01',
        with_release_type: '2|3',
        page: 1
      };

      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: movieParams
      });

      const fetchedMovies = response.data.results;

      fetchedMovies.forEach(movie => {
        const isAlreadyFavorite = favorites.value.some(fav => fav.id === movie.id);
        movie.isFavorite = isAlreadyFavorite;
      });

      movies.value = fetchedMovies;
    } catch (error) {
      console.error('API 통신 에러 상세 내역:', error);
      errorMessage.value = '영화 데이터를 불러오는 데 실패했습니다. 통신 상태나 API Key를 확인해 주세요.';
    } finally {
      isLoading.value = false;
    }
  };

  const toggleFavorite = (movieId) => {
    const movie = movies.value.find(m => m.id === movieId);
    if (movie) {
      movie.isFavorite = !movie.isFavorite;

      if (movie.isFavorite) {
        favorites.value.push(movie);
      } else {
        favorites.value = favorites.value.filter(m => m.id !== movieId);
      }
      sessionStorage.setItem('favorites', JSON.stringify(favorites.value));
    }
  };

  return {
    movies,
    favorites,
    isLoading,
    errorMessage,
    fetchMovies,
    toggleFavorite
  };
});