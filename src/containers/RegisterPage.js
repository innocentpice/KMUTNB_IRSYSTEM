import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authSignup, authCheck } from '../actions';

import { Button, Form, Grid, Header, Segment, Divider, Input, Select, Message, Icon } from 'semantic-ui-react'

const gender = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

const classRoom = [
  { key: 'ACCOUNTING', text: 'ACCOUNTING', value: 'ACCOUNTING' },
  { key: 'HUMANRESOURCE', text: 'HUMANRESOURCE', value: 'HUMANRESOURCE' },
  { key: 'PRODUCTION', text: 'PRODUCTION', value: 'PRODUCTION' },
  { key: 'IT', text: 'IT', value: 'IT' },
  { key: 'MARKETING', text: 'MARKETING', value: 'MARKETING' }
]

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm: '',
      gender: '',
      classroom: '',
      name: '',
      lastname: '',
      error: null
    }
  }

  componentWillMount() {
    this.props.authCheck((isLogin) => {
      isLogin && this.props.history.push('/');
    });
  }

  signUp() {
    const { email, password, gender, classroom, name, lastname, confirm } = this.state;
    const info = {
      displayName: name + ' ' + lastname,
      gender,
      classroom
    }
    if(password===confirm && password !== ''){
      this.props.authSignup(email, password, info,(error) => {
        this.setState({ 
          error,
          password: '',
          confirm: ''
        });
      });
    }else{
      this.setState({
        error: {message:'Password does not match the confirm password.'},
        password: '', 
        confirm: ''
      })
    }
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
      style={{ height: '100%', margin: '2% 3%'}}
      verticalAlign='top'
    >
      <Grid.Column>
        <Header as='h2' color='teal' textAlign='center'>
            Registration
        </Header>
        <Form size='large'>
          <Segment stacked>
            { this.state.error && <Message negative
              header="Can't Register"
              content={this.state.error.message}
            />}
            <Divider horizontal style={{marginTop: '2em'}}>Login Info</Divider>
            <Form.Input
                label = 'Email'
                fluid
                icon = 'user'
                iconPosition = 'left'
                placeholder = 'Email Address'
                type = 'email'
                value= {this.state.email}
                required
                onChange={event => this.setState({email: event.target.value})}
            />
            <Form.Input
                label = 'Password'
                fluid
                icon = 'lock'
                iconPosition = 'left'
                placeholder = 'Password'
                type = 'password'
                value= {this.state.password}
                required
                onChange={event => this.setState({password: event.target.value})}
            />
            
            <Form.Input
                label = 'Confirm Password'
                fluid
                icon = 'lock'
                iconPosition = 'left'
                placeholder = 'Confirm Password'
                type = 'password'
                value= {this.state.confirm}
                required
                onChange={event => this.setState({confirm: event.target.value})}
            />
            
            <Divider horizontal>Profile Info</Divider>
            <Form.Group widths='equal'>
              <Form.Field 
                control={Input} 
                label='First name' 
                placeholder='First name' 
                required 
                onChange={event => this.setState({name: event.target.value})}
              />
              <Form.Field 
                control={Input} 
                label='Last name' 
                placeholder='Last name' 
                required 
                onChange={event => this.setState({lastname: event.target.value})}
              />
            </Form.Group>
            
            <Form.Group widths='equal'>
              <Form.Field 
                control={Select} 
                label='Gender' 
                options={gender} 
                placeholder='Gender' 
                required
                onChange={(e, { value }) => {
                  this.setState({gender: value})
                }}
              />
              <Form.Field 
                control={Select} 
                label='DEPARTMENT' 
                options={classRoom} 
                placeholder='DEPARTMENT' 
                required 
                onChange={(e, { value }) => {
                  this.setState({classroom: value});
                }}
              />
            </Form.Group>
            
            <Divider />
            <Button color='teal' fluid size='large' onClick={()=>this.signUp()}>Register</Button>
          </Segment>
        </Form>
      
        <Message warning>
          <Icon name='help' />
          Already signed up?&nbsp;<Link to='/login'>Login here</Link>&nbsp;instead.
        </Message>
        
      </Grid.Column>
    </Grid>
  </div>
    );
  }
}

RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
  authSignup: PropTypes.func.isRequired,
  authCheck: PropTypes.func.isRequired
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { authSignup, authCheck })(RegisterPage);
