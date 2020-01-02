import authLogic from '../shared_logic/auth/logic'
import dashboardLogic from '../components/Dashboard/logic'

export default [
  ...authLogic,
  ...dashboardLogic
]
