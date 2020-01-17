import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu } from 'antd'

import { actions } from './actions'

const Logout = ({ onLogout, ...rest }) => (
  <Menu.Item
    {...rest}
    onClick={onLogout}
  >
    Logout
  </Menu.Item>
)

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout())
})

export default connect(null, mapDispatchToProps)(Logout)
