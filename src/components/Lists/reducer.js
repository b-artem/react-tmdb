import {
  LISTS_FETCH, LISTS_FETCH_SUCCESS, LISTS_FETCH_FAIL,
  LISTS_CREATE, LISTS_CREATE_SUCCESS, LISTS_CREATE_FAIL,
  LISTS_DELETE, LISTS_DELETE_SUCCESS, LISTS_DELETE_FAIL
} from './actions'
import { statuses } from './component'

const initialState = {
  status: statuses.LOADING
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LISTS_FETCH: {
      return {
        ...state,
        page: action.page
      }
    }
    case LISTS_FETCH_SUCCESS:
      return {
        ...state,
        status: action.payload.lists.length ? statuses.LOADED : statuses.EMPTY,
        lists: action.payload.lists,
        page: action.payload.page,
        totalResults: action.payload.totalResults
      }
    case LISTS_FETCH_FAIL: {
      const {
        lists, page, totalResults, ...newState
      } = state
      return {
        ...newState,
        status: statuses.LOADING
      }
    }
    case LISTS_CREATE: {
      return {
        ...state,
        name: action.name,
        description: action.description
      }
    }
    case LISTS_CREATE_SUCCESS: {
      const { name, description, ...newState } = state
      return {
        ...newState,
        lists: action.payload.lists
      }
    }
    case LISTS_CREATE_FAIL: {
      const { name, description, ...newState } = state
      return {
        ...newState
      }
    }
    case LISTS_DELETE: {
      return {
        ...state,
        id: action.id
      }
    }
    case LISTS_DELETE_SUCCESS: {
      const { id, ...newState } = state
      return {
        ...newState,
        lists: action.payload.lists
      }
    }
    case LISTS_DELETE_FAIL: {
      const { id, ...newState } = state
      return {
        ...newState
      }
    }
    default:
      return state
  }
}
