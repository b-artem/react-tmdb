import authLogic from '../shared_logic/auth/logic'
import dashboardLogic from '../components/Dashboard/logic'
import listsLogic from '../components/Lists/logic'
import listDetailsLogic from '../components/ListDetails/logic'
import movieListLogic from '../components/MovieList/logic'

export default [
  ...authLogic,
  ...dashboardLogic,
  ...listsLogic,
  ...listDetailsLogic,
  ...movieListLogic
]
