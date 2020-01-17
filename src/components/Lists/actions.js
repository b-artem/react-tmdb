export const key = 'lists'

export const LISTS_FETCH = 'LISTS_FETCH'
export const LISTS_FETCH_SUCCESS = 'LISTS_FETCH_SUCCESS'
export const LISTS_FETCH_FAIL = 'LISTS_FETCH_FAIL'
export const LISTS_CREATE = 'LISTS_CREATE'
export const LISTS_CREATE_SUCCESS = 'LISTS_CREATE_SUCCESS'
export const LISTS_CREATE_FAIL = 'LISTS_CREATE_FAIL'
export const LISTS_DELETE = 'LISTS_DELETE'
export const LISTS_DELETE_SUCCESS = 'LISTS_DELETE_SUCCESS'
export const LISTS_DELETE_FAIL = 'LISTS_DELETE_FAIL'

export const fetch = page => ({
  type: LISTS_FETCH,
  page
})

export const create = (name, description) => ({
  type: LISTS_CREATE,
  name,
  description
})

export const deleteList = id => ({
  type: LISTS_DELETE,
  id
})

export const actions = {
  fetch,
  create,
  deleteList
}
