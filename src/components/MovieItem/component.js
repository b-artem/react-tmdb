import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

const MovieItem = ({ actions, ...props }) => {
  const { title, overview, posterPath } = props

  return (
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
  )
}

MovieItem.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node)
}

MovieItem.defaultProps = {
  actions: []
}

export default MovieItem
