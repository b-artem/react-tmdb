import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Typography, Row, Col, Avatar, Dropdown, Icon, Menu, Layout
} from 'antd'
import { Link } from 'react-router-dom'

import Logout from '../Logout'

const Overlay = () => (
  <Menu>
    <Menu.Item>
      <Link to="/stubs/dashboard">Dashboard</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Link to="/stubs/lists">My Lists</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/stubs/watchlist">Watchlist</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/stubs/favorites">Favorites</Link>
    </Menu.Item>
    <Menu.Divider />
    <Logout />
  </Menu>
)

const Header = (props) => {
  const { username } = props

  return (
    <Layout.Header>
      <Row
        type="flex"
        justify="space-between"
      >
        <Col>
          <Typography.Text>THE MOVIE DB</Typography.Text>
        </Col>
        <Col>
          <Avatar icon="user" />
          {' '}
          <Dropdown overlay={Overlay}>
            <Typography.Text>
              {username}
              {' '}
              <Icon type="caret-down" />
            </Typography.Text>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  )
}

Header.propTypes = {
  username: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  const { username } = state.auth
  return { username }
}

export default connect(mapStateToProps)(Header)
