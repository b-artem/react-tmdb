import {
  MOVIE_LIST_FETCH, MOVIE_LIST_FETCH_SUCCESS, MOVIE_LIST_FETCH_FAIL,
  MOVIE_LIST_DELETE, MOVIE_LIST_DELETE_SUCCESS, MOVIE_LIST_DELETE_FAIL
} from './actions'
import { statuses } from './component'

const initialState = {
  status: statuses.LOADING
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVIE_LIST_FETCH: {
      return {
        ...state,
        listType: action.listType,
        page: action.page
      }
    }
    case MOVIE_LIST_FETCH_SUCCESS:
      return {
        ...state,
        status: action.payload.movies.length ? statuses.LOADED : statuses.EMPTY,
        movies: action.payload.movies,
        page: action.payload.page,
        totalResults: action.payload.totalResults
      }
    case MOVIE_LIST_FETCH_FAIL: {
      const {
        movies, page, totalResults, ...newState
      } = state
      return {
        ...newState,
        status: statuses.LOADING
      }
    }
    case MOVIE_LIST_DELETE: {
      return {
        ...state,
        listType: action.listType,
        id: action.id
      }
    }
    case MOVIE_LIST_DELETE_SUCCESS: {
      const { id, ...newState } = state
      return {
        ...newState,
        movies: action.payload.movies
      }
    }
    case MOVIE_LIST_DELETE_FAIL: {
      const { id, ...newState } = state
      return {
        ...newState
      }
    }
    default:
      return state
  }
}
