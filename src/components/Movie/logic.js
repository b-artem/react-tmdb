import { createLogic } from 'redux-logic'
import moment from 'moment'

import isoLangs from '../../vendor/isoLangs'

import {
  MOVIE_FETCH, MOVIE_FETCH_SUCCESS, MOVIE_FETCH_FAIL
} from './actions'

export const fetchLogic = createLogic({
  type: MOVIE_FETCH,

  throttle: 1000,

  processOptions: {
    successType: MOVIE_FETCH_SUCCESS,
    failType: MOVIE_FETCH_FAIL
  },

  process({ httpClient, getState }) {
    const { id } = getState().movie
    const params = { append_to_response: 'credits,images' }

    return httpClient.get(`/movie/${id}`, { params }).then((resp) => {
      const {
        title, release_date: releaseDate, overview, original_language: originalLanguage,
        runtime, budget, revenue, genres, credits, images
      } = resp.data

      const hours = Math.floor(runtime / 60)
      const minutes = runtime % 60

      return {
        previousId: id,
        title,
        year: moment(releaseDate, 'YYYY-MM-DD').year(),
        overview,
        originalLanguage: isoLangs[originalLanguage].name,
        runtime: `${hours}h ${minutes}m`,
        budget: `$${budget.toLocaleString()}`,
        revenue: `$${revenue.toLocaleString()}`,
        genres,
        credits,
        backdrops: images.backdrops.slice(0, 3)
      }
    })
  }
})

// export const deleteListLogic = createLogic({
//   type: MOVIE_DELETE,
//
//   throttle: 1000,
//
//   processOptions: {
//     successType: MOVIE_DELETE_SUCCESS,
//     failType: MOVIE_DELETE_FAIL
//   },
//
//   process({ httpClient, getState }) {
//     const { sessionId } = getState().auth
//     const { id, redirectCallback } = getState().listDetails
//
//     const params = { session_id: sessionId }
//
//     return httpClient.delete(`/list/${id}`, { params }).then(() => {
//       redirectCallback()
//     }).catch(() => {
//       // At the moment of writing, API returns status 500, although it deletes a list
//       redirectCallback()
//     })
//   }
// })
//
// export const deleteMovieLogic = createLogic({
//   type: MOVIE_DELETE_MOVIE,
//
//   throttle: 1000,
//
//   processOptions: {
//     successType: MOVIE_DELETE_MOVIE_SUCCESS,
//     failType: MOVIE_DELETE_MOVIE_FAIL
//   },
//
//   process({ httpClient, getState }) {
//     const { sessionId } = getState().auth
//     const { listId, movieId } = getState().listDetails
//
//     const body = { media_id: movieId }
//     const params = { session_id: sessionId }
//
//     return httpClient.post(`/list/${listId}/remove_item`, body, { params }).then(() => {
//       const { movies } = getState().listDetails
//       const newMovies = movies.filter(movie => movie.id !== movieId)
//       return { movies: newMovies }
//     })
//   }
// })

export default [
  fetchLogic
]
