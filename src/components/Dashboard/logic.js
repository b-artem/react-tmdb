import { createLogic } from 'redux-logic'
import {
  DASHBOARD_FETCH, DASHBOARD_FETCH_SUCCESS, DASHBOARD_FETCH_FAIL
} from './actions'

export const fetchLogic = createLogic({
  type: DASHBOARD_FETCH,

  throttle: 1000,

  processOptions: {
    successType: DASHBOARD_FETCH_SUCCESS,
    failType: DASHBOARD_FETCH_FAIL
  },

  process({ httpClient, getState }) {
    const { page } = getState().dashboard

    const params = { api_key: process.env.API_KEY }
    if (page) {
      params.page = page
    }

    return httpClient.get(
      '/trending/movie/day',
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

export default [
  fetchLogic
]
