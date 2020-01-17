import { createLogic } from 'redux-logic'

import { listTypes } from './component'
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
    const { listType, page } = getState().movieList

    const path = listType === listTypes.FAVORITES
      ? `/account/${accountId}/favorite/movies`
      : `/account/${accountId}/watchlist/movies`

    const params = { session_id: sessionId }
    if (page) { params.page = page }

    return httpClient.get(path, { params }).then((resp) => {
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
    const { listType, movies, id } = getState().movieList

    const path = listType === listTypes.FAVORITES
      ? `/account/${accountId}/favorite`
      : `/account/${accountId}/watchlist`

    const params = { session_id: sessionId }

    const body = { media_type: 'movie', media_id: id }
    if (listType === listTypes.FAVORITES) {
      body.favorite = false
    } else {
      body.watchlist = false
    }

    return httpClient.post(path, body, { params }).then(() => {
      const newMovies = movies.filter(movie => movie.id !== id)
      return { movies: newMovies }
    })
  }
})

export default [
  fetchLogic,
  deleteLogic
]
