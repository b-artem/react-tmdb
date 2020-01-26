export const key = 'movie'

export const MOVIE_FETCH = 'MOVIE_FETCH'
export const MOVIE_FETCH_SUCCESS = 'MOVIE_FETCH_SUCCESS'
export const MOVIE_FETCH_FAIL = 'MOVIE_FETCH_FAIL'
export const MOVIE_TOGGLE_LIST = 'MOVIE_TOGGLE_LIST'
export const MOVIE_TOGGLE_LIST_SUCCESS = 'MOVIE_TOGGLE_LIST_SUCCESS'
export const MOVIE_TOGGLE_LIST_FAIL = 'MOVIE_TOGGLE_LIST_FAIL'

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

export const actions = {
  fetch,
  toggleList
}
