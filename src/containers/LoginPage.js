import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Message, Segment, Image } from 'semantic-ui-react';

import { authLogin, authCheck } from '../actions';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentWillMount() {
    this.props.authCheck((isLogin) => {
      isLogin && this.props.history.push('/');
    });
  }

  signIn = () => {
    const { email, password } = this.state;
    this.props.authLogin(email, password);
    this.setState({ password: '' });
  }

  render() {
    return (
      <div className='login-form'>
                <style>{`
                  body > div,
                  body > div > div,
                  body > div > div > div.login-form {
                    height: 100%;
                  }
                `}</style>
                <Grid
                  textAlign='center'
                  style={{ height: '100%', margin: 'auto 2%'}}
                  verticalAlign='middle'
                >
                  <Grid.Column style={{ maxWidth: 450}}>
                    <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu-7JAyKxAXEjVOVmNFD6bXIJEr9enAQhXL3ho_7n_X08wJlaQ' size='medium' shape='circular' centered/>
                    <Header as='h2' color='teal' textAlign='center'>
                        BCOM IR-SYSTEM
                    </Header>
                    {this.props.auth.error && <Message size='small'>{this.props.auth.error}</Message>}
                    <Form size='large'>
                      <Segment stacked>
                        <Form.Input
                          fluid
                          icon='user'
                          iconPosition='left'
                          placeholder='Username'
                          type='email'
                          value={this.state.email}
                          onChange={event => this.setState({email: event.target.value})}
                        />
                        <Form.Input
                          fluid
                          icon='lock'
                          iconPosition='left'
                          placeholder='Password'
                          type='password'
                          value={this.state.password}
                          onChange={event => this.setState({password: event.target.value})}
                        />
                        <Button color='teal' fluid size='large' onClick={()=>this.signIn()}>Login</Button>
                      </Segment>
                    </Form>
                    
                    <Message size='small' info>
                      <Link to={'/register'}>Register</Link>
                    </Message>
                  </Grid.Column>
                </Grid>
            </div>
    )
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  authLogin: PropTypes.func.isRequired,
  authCheck: PropTypes.func.isRequired
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { authLogin, authCheck })(LoginPage);
