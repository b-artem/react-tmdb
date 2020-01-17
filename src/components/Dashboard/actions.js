export const key = 'dashboard'

export const DASHBOARD_FETCH = 'DASHBOARD_FETCH'
export const DASHBOARD_FETCH_SUCCESS = 'DASHBOARD_FETCH_SUCCESS'
export const DASHBOARD_FETCH_FAIL = 'DASHBOARD_FETCH_FAIL'
export const DASHBOARD_SEARCH = 'DASHBOARD_SEARCH'
export const DASHBOARD_SEARCH_VALIDATION_SUCCESS = 'DASHBOARD_SEARCH_VALIDATION_SUCCESS'
export const DASHBOARD_SEARCH_VALIDATION_FAIL = 'DASHBOARD_SEARCH_VALIDATION_FAIL'

export const fetch = page => ({
  type: DASHBOARD_FETCH,
  page
})

export const search = query => ({
  type: DASHBOARD_SEARCH,
  query
})

export const actions = {
  fetch,
  search
}
