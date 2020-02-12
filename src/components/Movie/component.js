import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Layout,
  Row,
  Col,
  Carousel,
  Typography,
  Icon,
  Card,
  Tag,
  Popover,
  Button
} from 'antd'

import Header from '../Header'
import CreateListModal from '../CreateListModal'
import { actions } from './actions'
import { actions as listsActions } from '../Lists/actions'

const LOADED = 'LOADED'
const LOADING = 'LOADING'
const EMPTY = 'EMPTY'

export const statuses = {
  LOADED,
  LOADING,
  EMPTY
}

const FAVORITES = 'FAVORITES'
const WATCHLIST = 'WATCHLIST'

export const listTypes = {
  FAVORITES,
  WATCHLIST
}

const PopoverContent = ({
  lists, addToExistingList, openModal, closePopover
}) => (
  <React.Fragment>
    <div>
      <Button
        type="link"
        onClick={() => {
          closePopover()
          openModal()
        }}
      >
        Create new list ...
      </Button>
    </div>
    {lists.map(list => (
      <div key={list.id}>
        <Button
          type="link"
          onClick={() => {
            addToExistingList(list.id)
            closePopover()
          }}
        >
          {list.name}
        </Button>
      </div>
    ))}
  </React.Fragment>
)

PopoverContent.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  addToExistingList: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closePopover: PropTypes.func.isRequired
}

class Movie extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
      popoverVisible: false
    }

    this.handleVisiblePopover = (visible) => {
      this.setState({ popoverVisible: visible })
    }

    this.showModal = () => {
      this.setState({ modalVisible: true })
    }

    this.hideModal = () => {
      this.setState({ modalVisible: false })
    }

    this.saveFormRef = (formRef) => {
      this.formRef = formRef
    }

    this.handleAddToNewList = () => {
      const { form } = this.formRef.props

      form.validateFields((err, values) => {
        if (err) return

        const { onAddToNewList } = this.props
        const { name, description } = values

        onAddToNewList(name, description)

        form.resetFields()
        this.setState({ modalVisible: false })
      })
    }
  }

  render() {
    const {
      modalVisible, popoverVisible
    } = this.state
    const {
      previousId, status, title, year, overview, originalLanguage, runtime,
      budget, revenue, genres, credits, backdrops, favorite, watchlist, lists, listsStatus,
      onFetch, onToggleList, onFetchLists, onAddToExistingList, location
    } = this.props
    const { id } = location.state

    if (status !== LOADED || previousId !== id) {
      onFetch(id)
    }

    if (listsStatus !== LOADED) { onFetchLists() }

    return (
      <Layout>
        <Header />
        <Layout.Content>
          <Row type="flex">
            <Col span={24}>
              <Carousel autoplay>
                {backdrops.map(backdrop => (
                  <div key={backdrop.file_path}>
                    <img
                      className="movie-image"
                      src={`https://image.tmdb.org/t/p/original${backdrop.file_path}`}
                      alt=""
                    />
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
          <div className="top-margin">
            <Row>
              <Col
                span={20}
                offset={2}
              >
                <Typography.Title>
                  <span>{`${title} (${year})`}</span>
                  {' '}
                  <Popover
                    title="Add movie to list"
                    trigger="click"
                    visible={popoverVisible}
                    onVisibleChange={this.handleVisiblePopover}
                    content={(
                      <PopoverContent
                        lists={lists}
                        addToExistingList={onAddToExistingList}
                        openModal={this.showModal}
                        closePopover={() => this.handleVisiblePopover(false)}
                      />
                    )}
                  >
                    <Icon type="plus-circle" />
                  </Popover>
                  {' '}
                  <Icon
                    type="heart"
                    theme={favorite ? 'filled' : undefined}
                    onClick={() => onToggleList(id, listTypes.FAVORITES, !favorite)}
                  />
                  {' '}
                  <Icon
                    type="book"
                    theme={watchlist ? 'filled' : undefined}
                    onClick={() => onToggleList(id, listTypes.WATCHLIST, !watchlist)}
                  />
                </Typography.Title>
                <Typography.Title level={3}>Overview</Typography.Title>
                <Typography.Paragraph>
                  {overview}
                </Typography.Paragraph>
              </Col>
            </Row>
            <Row>
              <Col
                span={20}
                offset={2}
              >
                <Typography.Paragraph>
                  <b>Original Language: </b>
                  <span>{originalLanguage}</span>
                </Typography.Paragraph>
              </Col>
              <Col
                span={20}
                offset={2}
              >
                <Typography.Paragraph>
                  <b>Runtime: </b>
                  <span>{runtime}</span>
                </Typography.Paragraph>
              </Col>
              <Col
                span={20}
                offset={2}
              >
                <Typography.Paragraph>
                  <b>Budget: </b>
                  <span>{budget}</span>
                </Typography.Paragraph>
              </Col>
              <Col
                span={20}
                offset={2}
              >
                <Typography.Paragraph>
                  <b>Revenue: </b>
                  <span>{revenue}</span>
                </Typography.Paragraph>
              </Col>
              <Col
                span={20}
                offset={2}
              >
                <Typography.Paragraph>
                  <b>Genres: </b>
                  {genres.map(genre => (
                    <Tag key={genre.id}>{genre.name.toUpperCase()}</Tag>
                  ))}
                </Typography.Paragraph>
              </Col>
            </Row>
            <Row>
              <Col
                span={10}
                offset={2}
                className="top-margin"
              >
                <Typography.Title level={3}>Casts</Typography.Title>
              </Col>
            </Row>
            <Row
              gutter={8}
              type="flex"
            >
              <Col
                span={20}
                offset={2}
              >
                {credits.cast.map(role => (
                  <Col
                    key={role.cast_id}
                    xs={{ span: 12 }}
                    sm={{ span: 8 }}
                    md={{ span: 6 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Card
                      cover={(
                        <img
                          alt="profile"
                          src={`https://image.tmdb.org/t/p/w276_and_h350_face${role.profile_path}`}
                        />
                      )}
                      className="top-margin"
                    >
                      <Card.Meta
                        title={role.name}
                        description={role.character}
                      />
                    </Card>
                  </Col>
                ))}
              </Col>
            </Row>
            <Row>
              <Col
                span={10}
                offset={2}
                className="top-margin"
              >
                <Typography.Title level={3}>Crew</Typography.Title>
              </Col>
            </Row>
            <Row
              gutter={8}
              type="flex"
            >
              <Col
                span={20}
                offset={2}
              >
                {credits.crew.map(member => (
                  <Col
                    key={member.credit_id}
                    xs={{ span: 12 }}
                    sm={{ span: 8 }}
                    md={{ span: 6 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Card
                      cover={(
                        <img
                          alt="profile"
                          src={`https://image.tmdb.org/t/p/w276_and_h350_face${member.profile_path}`}
                        />
                      )}
                      className="top-margin"
                    >
                      <Card.Meta
                        title={member.name}
                        description={member.job}
                      />
                    </Card>
                  </Col>
                ))}
              </Col>
            </Row>
          </div>
        </Layout.Content>
        <CreateListModal
          wrappedComponentRef={this.saveFormRef}
          visible={modalVisible}
          onCancel={this.hideModal}
          onOk={this.handleAddToNewList}
        />
      </Layout>
    )
  }
}

Movie.propTypes = {
  previousId: PropTypes.number,
  status: PropTypes.oneOf(Object.values(statuses)).isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  originalLanguage: PropTypes.string.isRequired,
  runtime: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  revenue: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired,
  credits: PropTypes.shape({
    cast: PropTypes.arrayOf(
      PropTypes.shape({
        cast_id: PropTypes.number.isRequired,
        character: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        profile_path: PropTypes.string
      })
    ),
    crew: PropTypes.arrayOf(
      PropTypes.shape({
        credit_id: PropTypes.string.isRequired,
        job: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        profile_path: PropTypes.string
      })
    )
  }).isRequired,
  backdrops: PropTypes.arrayOf(
    PropTypes.shape({
      file_path: PropTypes.string.isRequired
    })
  ).isRequired,
  favorite: PropTypes.bool.isRequired,
  watchlist: PropTypes.bool.isRequired,
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  listsStatus: PropTypes.oneOf(Object.values(statuses)).isRequired,
  onFetch: PropTypes.func.isRequired,
  onToggleList: PropTypes.func.isRequired,
  onFetchLists: PropTypes.func.isRequired,
  onAddToNewList: PropTypes.func.isRequired,
  onAddToExistingList: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  }).isRequired
}

Movie.defaultProps = {
  previousId: null,
  lists: []
}

const mapStateToProps = (state) => {
  const {
    previousId, status, title, year, overview, originalLanguage, runtime, budget,
    revenue, genres, credits, backdrops, accountStates
  } = state.movie
  const { lists, status: listsStatus } = state.lists
  return {
    previousId,
    status,
    title,
    year,
    overview,
    originalLanguage,
    runtime,
    budget,
    revenue,
    genres,
    credits,
    backdrops,
    favorite: accountStates.favorite,
    watchlist: accountStates.watchlist,
    lists,
    listsStatus
  }
}

const mapDispatchToProps = dispatch => ({
  onFetch: id => dispatch(actions.fetch(id)),
  onToggleList: (id, listType, belongsToList) => {
    dispatch(actions.toggleList(id, listType, belongsToList))
  },
  onFetchLists: () => dispatch(listsActions.fetch(1)),
  onAddToNewList: (listName, listDescription) => {
    dispatch(actions.addToNewList(listName, listDescription))
  },
  onAddToExistingList: (listId) => {
    dispatch(actions.addToExistingList(listId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
