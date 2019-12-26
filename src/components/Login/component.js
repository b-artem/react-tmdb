import React from 'react'
// import { connect } from 'react-redux'

import {
  Button, Col, Form, Icon, Input, Layout, Row, Typography
} from 'antd'

// import classes from './Auth.css'
// import * as actions from '../../store/actions/index'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      usernameHasError: false,
      passwordHasError: false,
      loading: false
    }

    this.usernameChangedHandler = this.usernameChangedHandler.bind(this)
    this.passwordChangedHandler = this.passwordChangedHandler.bind(this)

    this.validate = this.validate.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
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

  handleLoginClick() {
    console.log(this.validate())
  }



  // checkValidity( value, rules ) {
  //     let isValid = true;
  //     if ( !rules ) {
  //         return true;
  //     }
  //
  //     if ( rules.required ) {
  //         isValid = value.trim() !== '' && isValid;
  //     }
  //
  //     if ( rules.minLength ) {
  //         isValid = value.length >= rules.minLength && isValid
  //     }
  //
  //     if ( rules.maxLength ) {
  //         isValid = value.length <= rules.maxLength && isValid
  //     }
  //
  //     if ( rules.isEmail ) {
  //         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  //         isValid = pattern.test( value ) && isValid
  //     }
  //
  //     if ( rules.isNumeric ) {
  //         const pattern = /^\d+$/;
  //         isValid = pattern.test( value ) && isValid
  //     }
  //
  //     return isValid;
  // }

  render() {
    const { username, loading, usernameHasError, passwordHasError } = this.state
    // debugger

    return (
      <div className="center">
        <Layout>
          <Layout.Content>
            <Row
              type="flex"
              justify="center"
            >
              <Col>
                <Form>
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
                      onClick={this.handleLoginClick}
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

// export default connect( null, mapDispatchToProps )( Auth );
export default Login


  // inputChangedHandler = ( event, controlName ) => {
  //     const updatedControls = {
  //         ...this.state.controls,
  //         [controlName]: {
  //             ...this.state.controls[controlName],
  //             value: event.target.value,
  //             valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
  //             touched: true
  //         }
  //     };
  //     this.setState( { controls: updatedControls } );
  // }

  // submitHandler = ( event ) => {
  //     event.preventDefault();
  //     this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
  // }
  //
  // switchAuthModeHandler = () => {
  //     this.setState(prevState => {
  //         return {isSignup: !prevState.isSignup};
  //     });
  // }

//   render () {
//       const formElementsArray = [];
//       for ( let key in this.state.controls ) {
//           formElementsArray.push( {
//               id: key,
//               config: this.state.controls[key]
//           } );
//       }
//
//       const form = formElementsArray.map( formElement => (
//           <Input
//               key={formElement.id}
//               elementType={formElement.config.elementType}
//               elementConfig={formElement.config.elementConfig}
//               value={formElement.config.value}
//               invalid={!formElement.config.valid}
//               shouldValidate={formElement.config.validation}
//               touched={formElement.config.touched}
//               changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
//       ) );
//
//       return (
//           <div className={classes.Auth}>
//               <form onSubmit={this.submitHandler}>
//                   {form}
//                   <Button btnType="Success">SUBMIT</Button>
//               </form>
//               <Button
//                   clicked={this.switchAuthModeHandler}
//                   btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
//           </div>
//       );
//   }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) )
//     };
// };
