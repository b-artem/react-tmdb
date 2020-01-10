export const key = 'favorites'

export const FAVORITES_FETCH = 'FAVORITES_FETCH'
export const FAVORITES_FETCH_SUCCESS = 'FAVORITES_FETCH_SUCCESS'
export const FAVORITES_FETCH_FAIL = 'FAVORITES_FETCH_FAIL'
export const FAVORITES_DELETE = 'FAVORITES_DELETE'
export const FAVORITES_DELETE_SUCCESS = 'FAVORITES_DELETE_SUCCESS'
export const FAVORITES_DELETE_FAIL = 'FAVORITES_DELETE_FAIL'


export const actionTypes = {
  FAVORITES_FETCH,
  FAVORITES_FETCH_SUCCESS,
  FAVORITES_FETCH_FAIL,
  FAVORITES_DELETE,
  FAVORITES_DELETE_SUCCESS,
  FAVORITES_DELETE_FAIL
}

export const fetch = page => ({
  type: FAVORITES_FETCH,
  page
})

export const deleteMovie = id => ({
  type: FAVORITES_DELETE,
  id
})

export const actions = {
  fetch,
  deleteMovie
}
