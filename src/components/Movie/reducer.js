import {
  MOVIE_FETCH, MOVIE_FETCH_SUCCESS, MOVIE_FETCH_FAIL,
  MOVIE_TOGGLE_LIST, MOVIE_TOGGLE_LIST_SUCCESS, MOVIE_TOGGLE_LIST_FAIL,
  MOVIE_CREATE_LIST, MOVIE_CREATE_LIST_SUCCESS, MOVIE_CREATE_LIST_FAIL,
  MOVIE_ADD_TO_LIST, MOVIE_ADD_TO_LIST_SUCCESS, MOVIE_ADD_TO_LIST_FAIL
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
    case MOVIE_CREATE_LIST: {
      return {
        ...state,
        listName: action.listName,
        listDescription: action.listDescription
      }
    }
    case MOVIE_CREATE_LIST_SUCCESS: {
      const { listName, listDescription, ...newState } = state
      return {
        ...newState,
        listId: action.payload.listId
      }
    }
    case MOVIE_CREATE_LIST_FAIL: {
      const { listName, listDescription, ...newState } = state
      return newState
    }
    case MOVIE_ADD_TO_LIST: {
      return {
        ...state,
        listId: action.listId || state.listId
      }
    }
    case MOVIE_ADD_TO_LIST_SUCCESS: {
      const { listId, ...newState } = state
      return newState
    }
    case MOVIE_ADD_TO_LIST_FAIL: {
      const { listId, ...newState } = state
      return newState
    }
    default:
      return state
  }
}
