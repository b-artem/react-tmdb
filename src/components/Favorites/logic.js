import { createLogic } from 'redux-logic'
import {
  FAVORITES_FETCH, FAVORITES_FETCH_SUCCESS, FAVORITES_FETCH_FAIL,
  FAVORITES_DELETE, FAVORITES_DELETE_SUCCESS, FAVORITES_DELETE_FAIL
} from './actions'

export const fetchLogic = createLogic({
  type: FAVORITES_FETCH,

  throttle: 1000,

  processOptions: {
    successType: FAVORITES_FETCH_SUCCESS,
    failType: FAVORITES_FETCH_FAIL
  },

  process({ httpClient, getState }) {
    const { accountId, sessionId } = getState().auth
    const { page } = getState().favorites

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
  type: FAVORITES_DELETE,

  throttle: 1000,

  processOptions: {
    successType: FAVORITES_DELETE_SUCCESS,
    failType: FAVORITES_DELETE_FAIL
  },

  process({ httpClient, getState }) {
    const { accountId, sessionId } = getState().auth
    const { movies, id } = getState().favorites

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
