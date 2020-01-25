export const key = 'movie'

export const MOVIE_FETCH = 'MOVIE_FETCH'
export const MOVIE_FETCH_SUCCESS = 'MOVIE_FETCH_SUCCESS'
export const MOVIE_FETCH_FAIL = 'MOVIE_FETCH_FAIL'

export const fetch = id => ({
  type: MOVIE_FETCH,
  id
})

export const actions = {
  fetch
}
