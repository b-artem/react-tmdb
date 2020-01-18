import { createLogic } from 'redux-logic'

import {
  LIST_DETAILS_FETCH, LIST_DETAILS_FETCH_SUCCESS, LIST_DETAILS_FETCH_FAIL,
  LIST_DETAILS_DELETE, LIST_DETAILS_DELETE_SUCCESS, LIST_DETAILS_DELETE_FAIL,
  LIST_DETAILS_DELETE_MOVIE, LIST_DETAILS_DELETE_MOVIE_SUCCESS, LIST_DETAILS_DELETE_MOVIE_FAIL
} from './actions'
import { moviesPerPage } from './component'

export const fetchLogic = createLogic({
  type: LIST_DETAILS_FETCH,

  throttle: 1000,

  processOptions: {
    successType: LIST_DETAILS_FETCH_SUCCESS,
    failType: LIST_DETAILS_FETCH_FAIL
  },

  process({ httpClient, getState }) {
    const { id, page } = getState().listDetails

    return httpClient.get(`/list/${id}`).then((resp) => {
      const allMovies = resp.data.items
      const startIdx = (page - 1) * moviesPerPage
      const endIdx = startIdx + moviesPerPage - 1

      const movies = allMovies.slice(startIdx, endIdx).map((movie) => {
        const {
          id: movieId, title, overview, poster_path: posterPath
        } = movie
        return {
          id: movieId,
          title,
          overview,
          posterPath
        }
      })

      return {
        previousId: id,
        name: resp.data.name,
        movies,
        page,
        totalResults: resp.data.item_count
      }
    })
  }
})

export const deleteListLogic = createLogic({
  type: LIST_DETAILS_DELETE,

  throttle: 1000,

  processOptions: {
    successType: LIST_DETAILS_DELETE_SUCCESS,
    failType: LIST_DETAILS_DELETE_FAIL
  },

  process({ httpClient, getState }) {
    const { sessionId } = getState().auth
    const { id, redirectCallback } = getState().listDetails

    const params = { session_id: sessionId }

    return httpClient.delete(`/list/${id}`, { params }).then(() => {
      redirectCallback()
    }).catch(() => {
      // At the moment of writing, API returns status 500, although it deletes a list
      redirectCallback()
    })
  }
})

export const deleteMovieLogic = createLogic({
  type: LIST_DETAILS_DELETE_MOVIE,

  throttle: 1000,

  processOptions: {
    successType: LIST_DETAILS_DELETE_MOVIE_SUCCESS,
    failType: LIST_DETAILS_DELETE_MOVIE_FAIL
  },

  process({ httpClient, getState }) {
    const { sessionId } = getState().auth
    const { listId, movieId } = getState().listDetails

    const body = { media_id: movieId }
    const params = { session_id: sessionId }

    return httpClient.post(`/list/${listId}/remove_item`, body, { params }).then(() => {
      const { movies } = getState().listDetails
      const newMovies = movies.filter(movie => movie.id !== movieId)
      return { movies: newMovies }
    })
  }
})

export default [
  fetchLogic,
  deleteListLogic,
  deleteMovieLogic
]
