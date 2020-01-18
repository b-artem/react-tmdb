import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Layout, Row, Col, Typography, Modal, Icon, Pagination, Empty, Spin
} from 'antd'

import Header from '../Header'
import CreateListModal from '../CreateListModal'
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

export const moviesPerPage = 20

const showDeleteMovieModal = (event, onDeleteMovie, listId, movieId) => {
  event.preventDefault()

  Modal.confirm({
    title: 'Do you want to delete movie from this list?',
    onOk() { onDeleteMovie(listId, movieId) },
    onCancel() {}
  })
}

const showDeleteListModal = (onDeleteList, id, redirectCallback) => {
  Modal.confirm({
    title: 'Do you want to delete list?',
    onOk() { onDeleteList(id, redirectCallback) },
    onCancel() {}
  })
}

class ListDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = { modalVisible: false }

    this.showModal = () => {
      this.setState({ modalVisible: true })
    }

    this.hideModal = () => {
      this.setState({ modalVisible: false })
    }

    this.redirectToLists = () => {
      const { history } = this.props
      history.push('/lists', { doReload: true })
    }
  }

  render() {
    const {
      previousId, name, status, movies, page, totalResults,
      onFetch, onDeleteList, onDeleteMovie, location
    } = this.props
    const { id } = location.state
    const { modalVisible } = this.state

    if (status !== LOADED || previousId !== id) {
      onFetch(id, page)
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
                      onClick={event => showDeleteMovieModal(event, onDeleteMovie, id, item.id)}
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
            pageSize={moviesPerPage}
            total={totalResults}
            className="pagination"
            disabled={status !== LOADED}
            onChange={newPage => onFetch(id, newPage)}
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
                <Typography.Title>
                  {name}
                  {' '}
                  <Icon
                    type="minus-circle"
                    onClick={() => showDeleteListModal(onDeleteList, id, this.redirectToLists)}
                  />
                </Typography.Title>
              </div>
            </Col>
          </Row>

          {content}
          {pagination}

        </Layout.Content>
        <Modal
          visible={modalVisible}
          onCancel={this.hideModal}
          okText="Create"
          title="Create list"
        >
          <CreateListModal />
        </Modal>
      </Layout>
    )
  }
}

ListDetails.propTypes = {
  previousId: PropTypes.number,
  status: PropTypes.oneOf(Object.values(statuses)).isRequired,
  name: PropTypes.string,
  onFetch: PropTypes.func.isRequired,
  onDeleteList: PropTypes.func.isRequired,
  onDeleteMovie: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      posterPath: PropTypes.string.isRequired
    })
  ),
  page: PropTypes.number,
  totalResults: PropTypes.number,
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

ListDetails.defaultProps = {
  previousId: null,
  name: null,
  movies: [],
  page: 1,
  totalResults: moviesPerPage
}

const mapStateToProps = (state) => {
  const {
    previousId, name, status, movies, page, totalResults
  } = state.listDetails
  return {
    previousId, name, status, movies, page, totalResults
  }
}

const mapDispatchToProps = dispatch => ({
  onFetch: (id, page) => dispatch(actions.fetch(id, page)),
  onDeleteList: (id, redirectCallback) => dispatch(actions.deleteList(id, redirectCallback)),
  onDeleteMovie: (listId, movieId) => dispatch(actions.deleteMovie(listId, movieId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListDetails)
