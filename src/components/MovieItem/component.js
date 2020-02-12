import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

const MovieItem = ({ actions, ...props }) => {
  const {
    title, id, overview, posterPath
  } = props

  return (
    <Link
      to={{
        pathname: '/movie',
        state: { id }
      }}
    >
      <Card
        hoverable
        cover={(
          <img
            alt="example"
            src={`https://image.tmdb.org/t/p/w154${posterPath}`}
          />
        )}
        className="top-margin"
        actions={actions}
      >
        <Card.Meta
          title={title}
          description={overview}
        />
      </Card>
    </Link>
  )
}

MovieItem.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  posterPath: PropTypes.string
}

MovieItem.defaultProps = {
  actions: [],
  posterPath: null
}

export default MovieItem
