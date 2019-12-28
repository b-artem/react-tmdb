import Cookies from 'js-cookie'

export default function isLoggedIn(isAuthenticatedFromStore) {
  return isAuthenticatedFromStore || Cookies.get('session_id')
}
