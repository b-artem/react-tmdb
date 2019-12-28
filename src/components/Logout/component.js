import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu } from 'antd'

import { actions } from './actions'

const Logout = ({ logout, ...rest }) => (
  <Menu.Item
    {...rest}
    onClick={logout}
  >
    Logout
  </Menu.Item>
)

Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
})

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// })

export default connect(null, mapDispatchToProps)(Logout)
