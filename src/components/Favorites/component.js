import React from 'react'

import MovieList from '../MovieList'
import { listTypes } from '../MovieList/component'

const Favorites = props => (
  <MovieList
    listType={listTypes.FAVORITES}
    {...props}
  />
)

export default Favorites
