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

export const fetch = page => ({
  type: MOVIE_LIST_FETCH,
  page
})

export const deleteMovie = id => ({
  type: MOVIE_LIST_DELETE,
  id
})

export const actions = {
  fetch,
  deleteMovie
}
