import React from 'react'
import {
  Link, Route, BrowserRouter as Router, Switch, withRouter
} from 'react-router-dom'

import PrivateRoute from '../PrivateRoute'
import Login from '../Login'
import Dashboard from '../Dashboard'
// import DashboardEmpty from '../DashboardEmpty'
// import DashboardLoading from '../DashboardLoading'
// import Movie from '../Movie'
// import Lists from '../Lists'
// import ListDetails from '../ListDetails'
// import Watchlist from '../Watchlist'
// import Favorites from '../Favorites/component'

const Links = () => (
  <React.Fragment>
    <div>
      <Link to="/login">Login</Link>
    </div>
    <div>
      <Link to="/dashboard">Dashboard with content</Link>
    </div>
  </React.Fragment>
)

const Root = () => (
  <Router>
    <Switch>
      <Route
        path="/login"
        component={Login}
      />
      <PrivateRoute
        path="/"
        component={withRouter(Dashboard)}
      />
      <PrivateRoute
        path="/dashboard"
        component={withRouter(Dashboard)}
      />
      <Route component={Links} />
    </Switch>
  </Router>
)

export default Root
