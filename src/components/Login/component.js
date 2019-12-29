import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {
  Button, Col, Form, Icon, Input, Layout, Row, Typography
} from 'antd'

import { actions } from './actions'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      usernameHasError: false,
      passwordHasError: false
    }

    this.usernameChangedHandler = this.usernameChangedHandler.bind(this)
    this.passwordChangedHandler = this.passwordChangedHandler.bind(this)

    this.validate = this.validate.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  usernameChangedHandler(event) {
    this.setState({ username: event.target.value })
  }

  passwordChangedHandler(event) {
    this.setState({ password: event.target.value })
  }

  validate() {
    return this.validateUsername() && this.validatePassword()
  }

  validateUsername() {
    const { username } = this.state
    const isValid = username.length > 0

    this.setState({ usernameHasError: !isValid })
    return isValid
  }

  validatePassword() {
    const { password } = this.state
    const isValid = password.length >= 4

    this.setState({ passwordHasError: !isValid })
    return isValid
  }

  handleLoginClick(event) {
    if (!this.validate()) {
      event.preventDefault()
    }
  }

  submitHandler(event) {
    const { username, password } = this.state
    const { onAuth } = this.props

    event.preventDefault()
    onAuth(username, password)
  }

  render() {
    const {
      loading, isAuthenticated, location
    } = this.props
    const {
      username, usernameHasError, passwordHasError
    } = this.state

    const from = location.state || { pathname: '/' }
    if (isAuthenticated) {
      return <Redirect to={from} />
    }

    return (
      <div className="center">
        <Layout>
          <Layout.Content>
            <Row
              type="flex"
              justify="center"
            >
              <Col>
                <Form onSubmit={this.submitHandler}>
                  <Typography.Title>The Movie DB</Typography.Title>
                  <Form.Item
                    validateStatus={usernameHasError ? 'error' : ''}
                    help={usernameHasError ? 'Should be combination of numbers & alphabets' : ''}
                  >
                    <Input
                      prefix={(
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      )}
                      placeholder="Username"
                      value={username}
                      onChange={event => this.usernameChangedHandler(event)}
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={passwordHasError ? 'error' : ''}
                    help={passwordHasError ? 'Password must contain at least 4 symbols' : ''}
                  >
                    <Input
                      prefix={(
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      )}
                      type="password"
                      placeholder="Password"
                      onChange={event => this.passwordChangedHandler(event)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      loading={loading}
                      type="primary"
                      htmlType="submit"
                      onClick={event => this.handleLoginClick(event)}
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
      </div>
    )
  }
}

Login.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
}

Login.defaultProps = {
  loading: true
}

const mapStateToProps = (state) => {
  const { loading, isAuthenticated } = state.auth
  return { loading, isAuthenticated }
}

const mapDispatchToProps = dispatch => ({
  onAuth: (username, password) => dispatch(actions.auth(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
