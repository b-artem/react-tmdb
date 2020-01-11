import React from 'react'

import MovieList from '../MovieList'
import { listTypes } from '../MovieList/component'

const Watchlist = props => (
  <MovieList
    listType={listTypes.WATCHLIST}
    {...props}
  />
)

export default Watchlist
