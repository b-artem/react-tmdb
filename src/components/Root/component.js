import React from 'react'
import {
  Route, BrowserRouter as Router, Switch, withRouter
} from 'react-router-dom'

import PrivateRoute from '../PrivateRoute'
import Login from '../Login'
import Dashboard from '../Dashboard'
import Movie from '../Movie'
import Lists from '../Lists'
import ListDetails from '../ListDetails'
import Watchlist from '../Watchlist'
import Favorites from '../Favorites'

const Root = () => (
  <Router>
    <Switch>
      <Route
        path="/login"
        component={Login}
      />
      <PrivateRoute
        exact
        path="/"
        component={withRouter(Dashboard)}
      />
      <PrivateRoute
        path="/dashboard"
        component={withRouter(Dashboard)}
      />
      <PrivateRoute
        path="/movie"
        component={withRouter(Movie)}
      />
      <PrivateRoute
        path="/lists"
        component={withRouter(Lists)}
      />
      <PrivateRoute
        path="/list/details"
        component={withRouter(ListDetails)}
      />
      <PrivateRoute
        path="/watchlist"
        component={withRouter(Watchlist)}
      />
      <PrivateRoute
        path="/favorites"
        component={withRouter(Favorites)}
      />
    </Switch>
  </Router>
)

export default Root
