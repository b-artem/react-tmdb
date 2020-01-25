import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Layout, Row, Col, Form, Input, Pagination, Empty, Spin
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
    status, onFetch, onSearch, movies, page, totalResults, queryHasError
  } = props

  if (status !== LOADED) {
    onFetch(page)
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
                  id={item.id}
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
          onChange={newPage => onFetch(newPage)}
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
            <Form>
              <Form.Item
                validateStatus={queryHasError ? 'error' : ''}
                help={queryHasError ? "Shouldn't  be empty" : ''}
              >
                <Input.Search
                  placeholder="Enter movie name"
                  size="large"
                  enterButton="Search"
                  className="top-margin"
                  onSearch={query => onSearch(query)}
                />
              </Form.Item>
            </Form>
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
  status: PropTypes.oneOf(Object.values(statuses)).isRequired,
  onFetch: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      posterPath: PropTypes.string
    })
  ),
  page: PropTypes.number,
  totalResults: PropTypes.number,
  queryHasError: PropTypes.bool
}

Dashboard.defaultProps = {
  movies: [],
  page: 1,
  totalResults: 20,
  queryHasError: false
}

const mapStateToProps = (state) => {
  const {
    status, movies, page, totalResults, queryHasError
  } = state.dashboard
  return {
    status, movies, page, totalResults, queryHasError
  }
}

const mapDispatchToProps = dispatch => ({
  onFetch: page => dispatch(actions.fetch(page)),
  onSearch: query => dispatch(actions.search(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
