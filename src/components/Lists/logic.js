import { createLogic } from 'redux-logic'

import {
  LISTS_FETCH, LISTS_FETCH_SUCCESS, LISTS_FETCH_FAIL,
  LISTS_CREATE, LISTS_CREATE_SUCCESS, LISTS_CREATE_FAIL,
  LISTS_DELETE, LISTS_DELETE_SUCCESS, LISTS_DELETE_FAIL
} from './actions'

export const fetchLogic = createLogic({
  type: LISTS_FETCH,

  throttle: 1000,

  processOptions: {
    successType: LISTS_FETCH_SUCCESS,
    failType: LISTS_FETCH_FAIL
  },

  process({ httpClient, getState }) {
    const { accountId, sessionId } = getState().auth
    const { page } = getState().lists

    const params = { session_id: sessionId }
    if (page) { params.page = page }

    return httpClient.get(`/account/${accountId}/lists`, { params }).then((resp) => {
      const lists = resp.data.results.map((list) => {
        const {
          id, name, description
        } = list
        return {
          id,
          name,
          description
        }
      })

      return {
        lists,
        page: resp.data.page,
        totalResults: resp.data.total_results
      }
    })
  }
})

export const createListLogic = createLogic({
  type: LISTS_CREATE,

  throttle: 1000,

  processOptions: {
    successType: LISTS_CREATE_SUCCESS,
    failType: LISTS_CREATE_FAIL
  },

  process({ httpClient, getState }) {
    const { sessionId } = getState().auth
    const { name, description, lists } = getState().lists

    const body = { name, description }
    const params = { session_id: sessionId }

    return httpClient.post('/list', body, { params }).then((resp) => {
      const id = resp.data.list_id
      const newList = { id, name, description }
      const newLists = [newList].concat(lists)
      return { lists: newLists }
    })
  }
})

export const deleteLogic = createLogic({
  type: LISTS_DELETE,

  throttle: 1000,

  processOptions: {
    successType: LISTS_DELETE_SUCCESS,
    failType: LISTS_DELETE_FAIL
  },

  process({ httpClient, getState }) {
    const { sessionId } = getState().auth
    const { lists, id } = getState().lists

    const params = { session_id: sessionId }

    return httpClient.delete(`/list/${id}`, { params }).then(() => {
      const newLists = lists.filter(list => list.id !== id)
      return { lists: newLists }
    }).catch(() => {
      // At the moment of writing, API returns status 500, although it deletes a list
      const newLists = lists.filter(list => list.id !== id)
      return { lists: newLists }
    })
  }
})

export default [
  fetchLogic,
  createListLogic,
  deleteLogic
]
