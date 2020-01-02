export const key = 'dashboard'

export const DASHBOARD_FETCH = 'DASHBOARD_FETCH'
export const DASHBOARD_FETCH_SUCCESS = 'DASHBOARD_FETCH_SUCCESS'
export const DASHBOARD_FETCH_FAIL = 'DASHBOARD_FETCH_FAIL'

export const actionTypes = {
  DASHBOARD_FETCH,
  DASHBOARD_FETCH_SUCCESS,
  DASHBOARD_FETCH_FAIL
}

export const fetch = page => ({
  type: DASHBOARD_FETCH,
  page
})

export const actions = {
  fetch
}
