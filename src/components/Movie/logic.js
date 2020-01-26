import { createLogic } from 'redux-logic'
import moment from 'moment'

import isoLangs from '../../vendor/isoLangs'

import {
  MOVIE_FETCH, MOVIE_FETCH_SUCCESS, MOVIE_FETCH_FAIL,
  MOVIE_TOGGLE_LIST, MOVIE_TOGGLE_LIST_SUCCESS, MOVIE_TOGGLE_LIST_FAIL
} from './actions'
import { listTypes } from './component'

export const fetchLogic = createLogic({
  type: MOVIE_FETCH,

  throttle: 1000,

  processOptions: {
    successType: MOVIE_FETCH_SUCCESS,
    failType: MOVIE_FETCH_FAIL
  },

  process({ httpClient, getState }) {
    const { sessionId } = getState().auth
    const { id } = getState().movie

    const params = {
      session_id: sessionId,
      append_to_response: 'credits,images,account_states'
    }

    return httpClient.get(`/movie/${id}`, { params }).then((resp) => {
      const {
        title, release_date: releaseDate, overview, original_language: originalLanguage,
        runtime, budget, revenue, genres, credits, images, account_states: accountStates
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
        backdrops: images.backdrops.slice(0, 3),
        accountStates
      }
    })
  }
})

export const toggleListLogic = createLogic({
  type: MOVIE_TOGGLE_LIST,

  throttle: 1000,

  processOptions: {
    successType: MOVIE_TOGGLE_LIST_SUCCESS,
    failType: MOVIE_TOGGLE_LIST_FAIL
  },

  process({ httpClient, getState }) {
    const { accountId, sessionId } = getState().auth
    const {
      id, listType, belongsToList, accountStates
    } = getState().movie

    const key = listType === listTypes.FAVORITES ? 'favorite' : 'watchlist'
    const path = `/account/${accountId}/${key}`

    const params = { session_id: sessionId }

    const body = { media_type: 'movie', media_id: id }
    body[key] = belongsToList

    return httpClient.post(path, body, { params }).then(() => {
      accountStates[key] = belongsToList
      return {
        previousId: id,
        accountStates
      }
    })
  }
})

export default [
  fetchLogic,
  toggleListLogic
]
