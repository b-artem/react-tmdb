import {
  FAVORITES_FETCH, FAVORITES_FETCH_SUCCESS, FAVORITES_FETCH_FAIL,
  FAVORITES_DELETE, FAVORITES_DELETE_SUCCESS, FAVORITES_DELETE_FAIL
} from './actions'
import { statuses } from './component'

const initialState = {
  status: statuses.LOADING
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FAVORITES_FETCH: {
      return {
        ...state,
        page: action.page
      }
    }
    case FAVORITES_FETCH_SUCCESS:
      return {
        ...state,
        status: action.payload.movies.length ? statuses.LOADED : statuses.EMPTY,
        movies: action.payload.movies,
        page: action.payload.page,
        totalResults: action.payload.totalResults
      }
    case FAVORITES_FETCH_FAIL: {
      const {
        movies, page, totalResults, ...newState
      } = state
      return {
        ...newState,
        status: statuses.LOADING
      }
    }
    case FAVORITES_DELETE: {
      return {
        ...state,
        id: action.id
      }
    }
    case FAVORITES_DELETE_SUCCESS: {
      const { id, ...newState } = state
      return {
        ...newState,
        movies: action.payload.movies
      }
    }
    case FAVORITES_DELETE_FAIL: {
      const { id, ...newState } = state
      return {
        ...newState
      }
    }
    default:
      return state
  }
}
