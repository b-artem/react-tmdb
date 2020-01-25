import {
  MOVIE_FETCH, MOVIE_FETCH_SUCCESS, MOVIE_FETCH_FAIL
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
  backdrops: []
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
        status: statuses.LOADED,
        ...state,
        ...action.payload
      }
    }
    case MOVIE_FETCH_FAIL: {
      return {
        status: statuses.LOADING
      }
    }
    default:
      return state
  }
}
