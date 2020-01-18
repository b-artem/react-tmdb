export const key = 'listDetails'

export const LIST_DETAILS_FETCH = 'LIST_DETAILS_FETCH'
export const LIST_DETAILS_FETCH_SUCCESS = 'LIST_DETAILS_FETCH_SUCCESS'
export const LIST_DETAILS_FETCH_FAIL = 'LIST_DETAILS_FETCH_FAIL'
export const LIST_DETAILS_DELETE = 'LIST_DETAILS_DELETE'
export const LIST_DETAILS_DELETE_SUCCESS = 'LIST_DETAILS_DELETE_SUCCESS'
export const LIST_DETAILS_DELETE_FAIL = 'LIST_DETAILS_DELETE_FAIL'
export const LIST_DETAILS_DELETE_MOVIE = 'LIST_DETAILS_DELETE_MOVIE'
export const LIST_DETAILS_DELETE_MOVIE_SUCCESS = 'LIST_DETAILS_DELETE_MOVIE_SUCCESS'
export const LIST_DETAILS_DELETE_MOVIE_FAIL = 'LIST_DETAILS_DELETE_MOVIE_FAIL'

export const fetch = (id, page) => ({
  type: LIST_DETAILS_FETCH,
  id,
  page
})

export const deleteList = (id, redirectCallback) => ({
  type: LIST_DETAILS_DELETE,
  id,
  redirectCallback
})

export const deleteMovie = (listId, movieId) => ({
  type: LIST_DETAILS_DELETE_MOVIE,
  listId,
  movieId
})

export const actions = {
  fetch,
  deleteList,
  deleteMovie
}
