import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Layout, Row, Col, Typography, Modal, Icon, Pagination, Spin, Empty
} from 'antd'

import Header from '../Header'
import MovieItem from '../MovieItem'
import { actions } from './actions'

const LOADED = 'LOADED'
const LOADING = 'LOADING'
const EMPTY = 'EMPTY'

export const statuses = {
  LOADED,
  LOADING,
  EMPTY
}

const showDeleteMovieModal = (onDelete, id) => {
  Modal.confirm({
    title: 'Do you want to delete movie from favorites?',
    onOk() { onDelete(id) },
    onCancel() {}
  })
}

const Favorites = (props) => {
  const {
    status, onFetch, onDelete, movies, page, totalResults
  } = props

  if (status !== LOADED) {
    onFetch(page)
  }

  let content

  switch (status) {
    case LOADED:
      content = (
        <Row
          gutter={8}
          type="flex"
        >
          <Col
            span={20}
            offset={2}
          >
            {movies.map(item => (
              <Col
                key={item.id}
                xs={{ span: 12 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
                lg={{ span: 6 }}
                xl={{ span: 4 }}
              >
                <MovieItem
                  key={item.id}
                  title={item.title}
                  overview={item.overview}
                  posterPath={item.posterPath}
                  actions={[<Icon
                    key="delete"
                    type="delete"
                    onClick={() => showDeleteMovieModal(onDelete, item.id)}
                  />]}
                />
              </Col>
            ))}
          </Col>
        </Row>
      )
      break
    case LOADING:
      content = (
        <Row
          type="flex"
          justify="center"
        >
          <Col>
            <Spin />
          </Col>
        </Row>
      )
      break
    case EMPTY:
      content = (
        <Empty
          description="No movies found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )
      break
    default:
      content = null
  }

  const pagination = [LOADING, LOADED].includes(status) ? (
    <Row
      type="flex"
      justify="center"
    >
      <Col>
        <Pagination
          defaultCurrent={1}
          current={page}
          pageSize={20}
          total={totalResults}
          className="pagination"
          disabled={status !== LOADED}
          onChange={newPage => onFetch(newPage)}
        />
      </Col>
    </Row>
  ) : null

  return (
    <Layout>
      <Header />
      <Layout.Content>
        <Row>
          <Col
            offset={2}
            span={20}
          >
            <div className="top-margin">
              <Typography.Title>Favorites</Typography.Title>
            </div>
          </Col>
        </Row>

        {content}
        {pagination}

      </Layout.Content>
    </Layout>
  )
}

Favorites.propTypes = {
  status: PropTypes.string.isRequired,
  onFetch: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      posterPath: PropTypes.string
    })
  ),
  page: PropTypes.number,
  totalResults: PropTypes.number
}

Favorites.defaultProps = {
  movies: [],
  page: 1,
  totalResults: 20
}

const mapStateToProps = (state) => {
  const {
    status, movies, page, totalResults
  } = state.favorites
  return {
    status, movies, page, totalResults
  }
}

const mapDispatchToProps = dispatch => ({
  onFetch: page => dispatch(actions.fetch(page)),
  onDelete: id => dispatch(actions.deleteMovie(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
