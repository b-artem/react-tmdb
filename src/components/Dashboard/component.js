import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Layout, Row, Col, Input, Pagination, Empty, Spin
} from 'antd'

import Header from '../Header'
import MovieItem from '../MovieItem'
import { actions } from './actions'

const TRENDING = 'TRENDING'
const SEARCH = 'SEARCH'

const LOADED = 'LOADED'
const INITIAL_LOADING = 'INITIAL_LOADING'
const PAGE_LOADING = 'PAGE_LOADING'
const EMPTY = 'EMPTY'

export const modes = {
  TRENDING,
  SEARCH
}

export const statuses = {
  LOADED,
  INITIAL_LOADING,
  PAGE_LOADING,
  EMPTY
}


const Dashboard = (props) => {
  const {
    status, onFetch, movies, page, totalResults
  } = props

  if (status !== LOADED) {
    onFetch()
  }

  let content

  switch (status) {
    case LOADED:
      content = (
        <Row
          type="flex"
          gutter={16}
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
                />
              </Col>
            ))}
          </Col>
        </Row>
      )
      break
    case INITIAL_LOADING:
    case PAGE_LOADING:
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

  const pagination = [PAGE_LOADING, LOADED].includes(status) ? (
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
          onChange={onFetch}
        />
      </Col>
    </Row>
  ) : null

  return (
    <Layout>
      <Header />
      <Layout.Content>
        <Row type="flex">
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 18, offset: 3 }}
            lg={{ span: 16, offset: 4 }}
            xl={{ span: 14, offset: 5 }}
          >
            <Input.Search
              placeholder="Enter movie name"
              size="large"
              enterButton="Search"
              className="top-margin"
            />
          </Col>
        </Row>
        <div className="top-margin">

          {content}
          {pagination}

        </div>
      </Layout.Content>
    </Layout>
  )
}

Dashboard.propTypes = {
  status: PropTypes.string.isRequired,
  onFetch: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      posterPath: PropTypes.string.isRequired
    })
  ),
  page: PropTypes.number,
  totalResults: PropTypes.number
}

Dashboard.defaultProps = {
  movies: [],
  page: 1,
  totalResults: 20
}

const mapStateToProps = (state) => {
  const {
    mode, status, movies, page, totalResults
  } = state.dashboard
  return {
    mode, status, movies, page, totalResults
  }
}

const mapDispatchToProps = dispatch => ({
  onFetch: page => dispatch(actions.fetch(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
