import { createLogic } from 'redux-logic'
import {
  DASHBOARD_FETCH, DASHBOARD_FETCH_SUCCESS, DASHBOARD_FETCH_FAIL,
  DASHBOARD_SEARCH, DASHBOARD_SEARCH_VALIDATION_SUCCESS, DASHBOARD_SEARCH_VALIDATION_FAIL
} from './actions'
import { modes } from './component'


export const fetchLogic = createLogic({
  type: DASHBOARD_FETCH,

  throttle: 1000,

  processOptions: {
    successType: DASHBOARD_FETCH_SUCCESS,
    failType: DASHBOARD_FETCH_FAIL
  },

  process({ httpClient, getState }) {
    const { mode, page, query } = getState().dashboard

    const params = { api_key: process.env.API_KEY }
    if (page) {
      params.page = page
    }

    let path
    if (mode === modes.TRENDING) {
      path = '/trending/movie/day'
    } else if (mode === modes.SEARCH) {
      path = '/search/movie'
      params.query = query
    }

    return httpClient.get(
      path,
      { params }
    ).then((resp) => {
      const movies = resp.data.results.map((movie) => {
        const {
          id, title, overview, poster_path: posterPath
        } = movie
        return {
          id,
          title,
          overview: overview.slice(0, 160),
          posterPath
        }
      })

      return {
        movies,
        page: resp.data.page,
        totalResults: resp.data.total_results
      }
    })
  }
})

export const searchLogic = createLogic({
  type: DASHBOARD_SEARCH,

  process({ getState }, dispatch, done) {
    const { query } = getState().dashboard

    if (query.length > 0) {
      dispatch({ type: DASHBOARD_SEARCH_VALIDATION_SUCCESS })
      dispatch({ type: DASHBOARD_FETCH, page: 1 })
      done()
    } else {
      dispatch({ type: DASHBOARD_SEARCH_VALIDATION_FAIL })
      done()
    }
  }
})

export default [
  fetchLogic,
  searchLogic
]
