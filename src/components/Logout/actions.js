export const key = 'auth'

export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'

export const logout = () => ({
  type: LOGOUT
})

export const actions = {
  logout
}
