import { createLogic } from 'redux-logic'
import {
  MOVIE_LIST_FETCH, MOVIE_LIST_FETCH_SUCCESS, MOVIE_LIST_FETCH_FAIL,
  MOVIE_LIST_DELETE, MOVIE_LIST_DELETE_SUCCESS, MOVIE_LIST_DELETE_FAIL
} from './actions'

export const fetchLogic = createLogic({
  type: MOVIE_LIST_FETCH,

  throttle: 1000,

  processOptions: {
    successType: MOVIE_LIST_FETCH_SUCCESS,
    failType: MOVIE_LIST_FETCH_FAIL
  },

  process({ httpClient, getState }) {
    const { accountId, sessionId } = getState().auth
    const { page } = getState().movieList

    const params = { api_key: process.env.API_KEY, session_id: sessionId }
    if (page) {
      params.page = page
    }

    return httpClient.get(
      `/account/${accountId}/favorite/movies`,
      { params }
    ).then((resp) => {
      const movies = resp.data.results.map((movie) => {
        const {
          id, title, overview, poster_path: posterPath
        } = movie
        return {
          id,
          title,
          overview: overview.slice(0, 160),
          posterPath
        }
      })

      return {
        movies,
        page: resp.data.page,
        totalResults: resp.data.total_results
      }
    })
  }
})

export const deleteLogic = createLogic({
  type: MOVIE_LIST_DELETE,

  throttle: 1000,

  processOptions: {
    successType: MOVIE_LIST_DELETE_SUCCESS,
    failType: MOVIE_LIST_DELETE_FAIL
  },

  process({ httpClient, getState }) {
    const { accountId, sessionId } = getState().auth
    const { movies, id } = getState().movieList

    const params = { api_key: process.env.API_KEY, session_id: sessionId }

    return httpClient.post(
      `/account/${accountId}/favorite`,
      { media_type: 'movie', media_id: id, favorite: false },
      { params }
    ).then(() => {
      const newMovies = movies.filter(movie => movie.id !== id)
      return { movies: newMovies }
    })
  }
})

export default [
  fetchLogic,
  deleteLogic
]
