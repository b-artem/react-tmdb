import {
  LIST_DETAILS_FETCH, LIST_DETAILS_FETCH_SUCCESS, LIST_DETAILS_FETCH_FAIL,
  LIST_DETAILS_DELETE, LIST_DETAILS_DELETE_SUCCESS, LIST_DETAILS_DELETE_FAIL,
  LIST_DETAILS_DELETE_MOVIE, LIST_DETAILS_DELETE_MOVIE_SUCCESS, LIST_DETAILS_DELETE_MOVIE_FAIL
} from './actions'
import { statuses } from './component'

const initialState = {
  status: statuses.LOADING
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_DETAILS_FETCH: {
      return {
        ...state,
        id: action.id,
        page: action.page
      }
    }
    case LIST_DETAILS_FETCH_SUCCESS: {
      return {
        ...state,
        previousId: action.payload.previousId,
        name: action.payload.name,
        status: action.payload.movies.length ? statuses.LOADED : statuses.EMPTY,
        movies: action.payload.movies,
        page: action.payload.page,
        totalResults: action.payload.totalResults
      }
    }
    case LIST_DETAILS_FETCH_FAIL: {
      const {
        id, previousId, name, movies, page, totalResults, ...newState
      } = state
      return {
        ...newState,
        status: statuses.LOADING
      }
    }
    case LIST_DETAILS_DELETE: {
      return {
        ...state,
        id: action.id,
        redirectCallback: action.redirectCallback
      }
    }
    case LIST_DETAILS_DELETE_SUCCESS: {
      return {}
    }
    case LIST_DETAILS_DELETE_FAIL: {
      const { redirectCallback, ...newState } = state
      return newState
    }
    case LIST_DETAILS_DELETE_MOVIE: {
      return {
        ...state,
        listId: action.listId,
        movieId: action.movieId
      }
    }
    case LIST_DETAILS_DELETE_MOVIE_SUCCESS: {
      const { listId, movieId, ...newState } = state
      return {
        ...newState,
        movies: action.payload.movies
      }
    }
    case LIST_DETAILS_DELETE_MOVIE_FAIL: {
      const { listId, movieId, ...newState } = state
      return newState
    }
    default:
      return state
  }
}
