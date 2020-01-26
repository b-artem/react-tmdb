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
  Button,
  Modal
} from 'antd'

import Header from '../Header'
import CreateListModal from '../CreateListModal'
import { actions } from './actions'

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

const PopoverContent = ({ openModal, closePopover }) => (
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
    <div>
      <Button type="link">List 1</Button>
    </div>
    <div>
      <Button type="link">List 2</Button>
    </div>
    <div>
      <Button type="link">List 3</Button>
    </div>
  </React.Fragment>
)

PopoverContent.propTypes = {
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
  }

  render() {
    const {
      modalVisible, popoverVisible
    } = this.state
    const {
      previousId, status, title, year, overview, originalLanguage, runtime,
      budget, revenue, genres, credits, backdrops, favorite, watchlist,
      onFetch, onToggleList, location
    } = this.props
    const { id } = location.state

    if (status !== LOADED || previousId !== id) {
      onFetch(id)
    }

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
  onFetch: PropTypes.func.isRequired,
  onToggleList: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  }).isRequired
}

Movie.defaultProps = {
  previousId: null
}

const mapStateToProps = (state) => {
  const {
    previousId, status, title, year, overview, originalLanguage, runtime, budget,
    revenue, genres, credits, backdrops, accountStates
  } = state.movie
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
    watchlist: accountStates.watchlist
  }
}

const mapDispatchToProps = dispatch => ({
  onFetch: id => dispatch(actions.fetch(id)),
  onToggleList: (id, listType, belongsToList) => {
    dispatch(actions.toggleList(id, listType, belongsToList))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
