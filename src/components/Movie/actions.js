export const key = 'movie'

export const MOVIE_FETCH = 'MOVIE_FETCH'
export const MOVIE_FETCH_SUCCESS = 'MOVIE_FETCH_SUCCESS'
export const MOVIE_FETCH_FAIL = 'MOVIE_FETCH_FAIL'

export const MOVIE_TOGGLE_LIST = 'MOVIE_TOGGLE_LIST'
export const MOVIE_TOGGLE_LIST_SUCCESS = 'MOVIE_TOGGLE_LIST_SUCCESS'
export const MOVIE_TOGGLE_LIST_FAIL = 'MOVIE_TOGGLE_LIST_FAIL'

export const MOVIE_CREATE_LIST = 'MOVIE_CREATE_LIST'
export const MOVIE_CREATE_LIST_SUCCESS = 'MOVIE_CREATE_LIST_SUCCESS'
export const MOVIE_CREATE_LIST_FAIL = 'MOVIE_CREATE_LIST_FAIL'

export const MOVIE_ADD_TO_LIST = 'MOVIE_ADD_TO_LIST'
export const MOVIE_ADD_TO_LIST_SUCCESS = 'MOVIE_ADD_TO_LIST_SUCCESS'
export const MOVIE_ADD_TO_LIST_FAIL = 'MOVIE_ADD_TO_LIST_FAIL'

export const MOVIE_FETCH_LISTS = 'MOVIE_FETCH_LISTS'
export const MOVIE_FETCH_LISTS_SUCCESS = 'MOVIE_FETCH_LISTS_SUCCESS'
export const MOVIE_FETCH_LISTS_FAIL = 'MOVIE_FETCH_LISTS_FAIL'

export const fetch = id => ({
  type: MOVIE_FETCH,
  id
})

export const toggleList = (id, listType, belongsToList) => ({
  type: MOVIE_TOGGLE_LIST,
  id,
  listType,
  belongsToList
})

export const addToNewList = (listName, listDescription) => ({
  type: MOVIE_CREATE_LIST,
  listName,
  listDescription
})

export const addToExistingList = listId => ({
  type: MOVIE_ADD_TO_LIST,
  listId
})

export const fetchLists = () => ({
  type: MOVIE_FETCH_LISTS
})

export const actions = {
  fetch,
  toggleList,
  addToNewList,
  addToExistingList,
  fetchLists
}
