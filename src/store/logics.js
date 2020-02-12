import authLogic from '../shared_logic/auth/logic'
import dashboardLogic from '../components/Dashboard/logic'
import movieLogic from '../components/Movie/logic'
import listsLogic from '../components/Lists/logic'
import listDetailsLogic from '../components/ListDetails/logic'
import movieListLogic from '../components/MovieList/logic'

export default [
  ...authLogic,
  ...dashboardLogic,
  ...movieLogic,
  ...listsLogic,
  ...listDetailsLogic,
  ...movieListLogic
]
