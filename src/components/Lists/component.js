import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Layout, Row, Col, Card, Typography, Modal, Icon, Pagination, Spin, Empty
} from 'antd'
import { Link } from 'react-router-dom'

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

const showDeleteModal = (event, onDelete, id) => {
  event.preventDefault()

  Modal.confirm({
    title: 'Do you want to delete list?',
    onOk() { onDelete(id) },
    onCancel() {}
  })
}

class Lists extends React.Component {
  constructor(props) {
    super(props)

    this.state = { modalVisible: false }

    this.showModal = () => {
      this.setState({ modalVisible: true })
    }

    this.hideModal = () => {
      this.setState({ modalVisible: false })
    }

    this.saveFormRef = (formRef) => {
      this.formRef = formRef
    }

    this.handleCreate = () => {
      const { form } = this.formRef.props

      form.validateFields((err, values) => {
        if (err) return

        const { onCreate } = this.props
        const { name, description } = values

        onCreate(name, description)

        form.resetFields()
        this.setState({ modalVisible: false })
      })
    }
  }

  render() {
    const {
      status, lists, page, totalResults, onFetch, onDelete, location
    } = this.props
    const doReload = location.state && location.state.doReload
    const { modalVisible } = this.state

    if (status !== LOADED || doReload) {
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
              {lists.map(item => (
                <Col
                  key={item.id}
                  xs={{ span: 12 }}
                  sm={{ span: 8 }}
                  md={{ span: 6 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <Link
                    to={{
                      pathname: '/list/details',
                      state: { id: item.id }
                    }}
                  >
                    <Card
                      hoverable
                      className="top-margin"
                      actions={[<Icon
                        key="delete"
                        type="delete"
                        onClick={event => showDeleteModal(event, onDelete, item.id)}
                      />]}
                    >
                      <Typography.Title level={4}>
                        {item.name}
                      </Typography.Title>
                      {item.description}
                    </Card>
                  </Link>
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
            description="No lists found"
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
                <Typography.Title>
                  My Lists
                  {' '}
                  <Icon
                    type="plus-circle"
                    onClick={this.showModal}
                  />
                </Typography.Title>
              </div>
            </Col>
          </Row>

          {content}
          {pagination}

        </Layout.Content>

        <CreateListModal
          wrappedComponentRef={this.saveFormRef}
          visible={modalVisible}
          onCancel={this.hideModal}
          onOk={this.handleCreate}
        />
      </Layout>
    )
  }
}

Lists.propTypes = {
  status: PropTypes.oneOf(Object.values(statuses)).isRequired,
  onFetch: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ),
  page: PropTypes.number,
  totalResults: PropTypes.number,
  location: PropTypes.shape({
    state: PropTypes.shape({
      doReload: PropTypes.bool
    })
  }).isRequired
}

Lists.defaultProps = {
  lists: [],
  page: 1,
  totalResults: 20
}

const mapStateToProps = (state) => {
  const {
    status, lists, page, totalResults
  } = state.lists
  return {
    status, lists, page, totalResults
  }
}

const mapDispatchToProps = dispatch => ({
  onFetch: page => dispatch(actions.fetch(page)),
  onCreate: (name, description) => dispatch(actions.create(name, description)),
  onDelete: id => dispatch(actions.deleteList(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
