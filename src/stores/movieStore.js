import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useMovieStore = defineStore('movie', () => {
  const movies = ref([]);
  const favorites = ref(JSON.parse(sessionStorage.getItem('favorites')) || []);
  const isLoading = ref(false);
  const errorMessage = ref('');
  const selectedMovie = ref(null);
  const searchKeyword = ref('');
  const sortType = ref('popularity');
  const currentPage = ref(1);
  const itemsPerPage = ref(6);


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

  const fetchMovieDetail = async (movieId) => {
    isLoading.value = true;
    errorMessage.value = '';
    selectedMovie.value = null;

    try{
      const API_KEY = '82f60caa707dcf958839d621bcbab16d';
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;

      const response = await axios.get(url, {
        params : {
          api_key : API_KEY,
          language : 'ko-KR'
        }
      });
      selectedMovie.value = response.data;
    }catch(error){
      if (error.response && error.response.status === 404) {
      errorMessage.value = '존재하지 않거나 삭제된 영화 정보입니다.';
      } else {
        errorMessage.value = '서버 통신 중 에러가 발생했습니다.';
      }
    }finally {
      isLoading.value = false;
    }
  };

  const filteredMovies = computed(() => {
  let result = movies.value;

  if (searchKeyword.value.trim() !== '') {
    result = result.filter(movie =>
      movie.title.toLowerCase().includes(searchKeyword.value.trim().toLowerCase())
    );
  }

  result = [...result].sort((a, b) => {
    if (sortType.value === 'title') {
      return a.title.localeCompare(b.title);
    }

    if (sortType.value === 'release_date') {
      return new Date(b.release_date) - new Date(a.release_date);
    }

    if (sortType.value === 'rating') {
      return b.vote_average - a.vote_average;
    }

    return b.popularity - a.popularity;
  });

  return result;
});

  const totalPages = computed(() => {
    return Math.ceil(filteredMovies.value.length / itemsPerPage.value);
  });

  const paginatedMovies = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;

    return filteredMovies.value.slice(start, end);
  });

  const setSearchKeyword = (keyword) => {
    searchKeyword.value = keyword;
    currentPage.value = 1;
  };

  const setSortType = (type) => {
    sortType.value = type;
    currentPage.value = 1;
  };

  const setPage = (page) => {
    currentPage.value = page;
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
    toggleFavorite,
    selectedMovie,
    fetchMovieDetail,
    searchKeyword,
    sortType,
    currentPage,
    itemsPerPage,
    filteredMovies,
    paginatedMovies,
    totalPages,
    setSearchKeyword,
    setSortType,
    setPage,
  };
  
});
