import React from 'react'
import {
  Link, Route, BrowserRouter as Router, Switch
} from 'react-router-dom'

import Login from '../Login'
// import Dashboard from '../Dashboard'
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
  </React.Fragment>
)

const Root = () => (
  <Router>
    <Switch>
      <Route
        path="/login"
        component={Login}
      />
      <Route component={Links} />
    </Switch>
  </Router>
)

export default Root
