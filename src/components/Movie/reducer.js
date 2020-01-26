import {
  MOVIE_FETCH, MOVIE_FETCH_SUCCESS, MOVIE_FETCH_FAIL,
  MOVIE_TOGGLE_LIST, MOVIE_TOGGLE_LIST_SUCCESS, MOVIE_TOGGLE_LIST_FAIL
} from './actions'
import { statuses } from './component'

const initialState = {
  status: statuses.LOADING,
  title: '',
  year: 0,
  overview: '',
  originalLanguage: '',
  runtime: '',
  budget: '',
  revenue: '',
  genres: [],
  credits: {
    cast: [],
    crew: []
  },
  backdrops: [],
  accountStates: {
    favorite: false,
    watchlist: false
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVIE_FETCH: {
      return {
        ...state,
        id: action.id
      }
    }
    case MOVIE_FETCH_SUCCESS: {
      return {
        ...state,
        status: statuses.LOADED,
        ...action.payload
      }
    }
    case MOVIE_FETCH_FAIL: {
      return {
        status: statuses.LOADING
      }
    }
    case MOVIE_TOGGLE_LIST: {
      return {
        ...state,
        id: action.id,
        listType: action.listType,
        belongsToList: action.belongsToList
      }
    }
    case MOVIE_TOGGLE_LIST_SUCCESS: {
      const { listType, belongsToList, ...newState } = state
      return {
        ...newState,
        accountStates: action.payload.accountStates
      }
    }
    case MOVIE_TOGGLE_LIST_FAIL: {
      const { listType, belongsToList, ...newState } = state
      return {
        ...newState,
        previousId: action.payload.previousId
      }
    }
    default:
      return state
  }
}
