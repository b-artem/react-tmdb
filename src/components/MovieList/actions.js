export const key = 'movieList'

export const MOVIE_LIST_FETCH = 'MOVIE_LIST_FETCH'
export const MOVIE_LIST_FETCH_SUCCESS = 'MOVIE_LIST_FETCH_SUCCESS'
export const MOVIE_LIST_FETCH_FAIL = 'MOVIE_LIST_FETCH_FAIL'
export const MOVIE_LIST_DELETE = 'MOVIE_LIST_DELETE'
export const MOVIE_LIST_DELETE_SUCCESS = 'MOVIE_LIST_DELETE_SUCCESS'
export const MOVIE_LIST_DELETE_FAIL = 'MOVIE_LIST_DELETE_FAIL'


export const actionTypes = {
  MOVIE_LIST_FETCH,
  MOVIE_LIST_FETCH_SUCCESS,
  MOVIE_LIST_FETCH_FAIL,
  MOVIE_LIST_DELETE,
  MOVIE_LIST_DELETE_SUCCESS,
  MOVIE_LIST_DELETE_FAIL
}

export const fetch = (listType, page) => ({
  type: MOVIE_LIST_FETCH,
  listType,
  page
})

export const deleteMovie = (listType, id) => ({
  type: MOVIE_LIST_DELETE,
  listType,
  id
})

export const actions = {
  fetch,
  deleteMovie
}
