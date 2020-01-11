import authLogic from '../shared_logic/auth/logic'
import dashboardLogic from '../components/Dashboard/logic'
import movieListLogic from '../components/MovieList/logic'

export default [
  ...authLogic,
  ...dashboardLogic,
  ...movieListLogic
]
