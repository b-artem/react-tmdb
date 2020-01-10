import authLogic from '../shared_logic/auth/logic'
import dashboardLogic from '../components/Dashboard/logic'
import favoritesLogic from '../components/Favorites/logic'

export default [
  ...authLogic,
  ...dashboardLogic,
  ...favoritesLogic
]
