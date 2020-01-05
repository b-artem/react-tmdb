import {
  DASHBOARD_FETCH, DASHBOARD_FETCH_SUCCESS, DASHBOARD_FETCH_FAIL,
  DASHBOARD_SEARCH, DASHBOARD_SEARCH_VALIDATION_SUCCESS, DASHBOARD_SEARCH_VALIDATION_FAIL
} from './actions'
import { modes, statuses } from './component'

const initialState = {
  mode: modes.TRENDING,
  status: statuses.INITIAL_LOADING
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DASHBOARD_FETCH: {
      return {
        ...state,
        page: action.page
      }
    }
    case DASHBOARD_FETCH_SUCCESS:
      return {
        ...state,
        status: action.payload.movies.length ? statuses.LOADED : statuses.EMPTY,
        movies: action.payload.movies,
        page: action.payload.page,
        totalResults: action.payload.totalResults
      }
    case DASHBOARD_FETCH_FAIL: {
      const { movies, ...newState } = state
      return {
        ...newState,
        status: statuses.INITIAL_LOADING
      }
    }
    case DASHBOARD_SEARCH: {
      return {
        ...state,
        query: action.query
      }
    }
    case DASHBOARD_SEARCH_VALIDATION_SUCCESS: {
      return {
        ...state,
        mode: modes.SEARCH,
        queryHasError: false
      }
    }
    case DASHBOARD_SEARCH_VALIDATION_FAIL: {
      return {
        ...state,
        queryHasError: true
      }
    }
    default:
      return state
  }
}
