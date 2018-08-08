import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import DatePicker from 'react-datepicker';

import {
    feedUpdate
} from '../actions';

import { Card, Icon, Button, Form, Input, TextArea, Select, Segment, Label } from 'semantic-ui-react';

class EditFeed extends Component {
   
    constructor(props) {
        super(props);
        const { header, description, sendTo } = this.props.feed
        const deadline = moment(this.props.feed.deadline);
        this.state = { header, description, sendTo, deadline };
    }
   
   
    handleSubmit(){
        const {header, description, sendTo, deadline } = this.state;
        const newFeed = {header, description, sendTo, key:this.props.feed.key, deadline: moment(deadline).toString(), oldSendTo: this.props.feed.sendTo }
        this.props.feedUpdate(newFeed,this.props.uid);
    }
   
    render(){
        
        const {users, handleCancel} = this.props
        
        const {header, description, sendTo, deadline} = this.state
        
        return(
            <Card fluid>
            <Form  size='small' style={{padding: '0.5em 0px'}}>
              <Card.Content style={{padding: '0.5em 1em'}}>
                <Form.Field
                    control={Input} 
                    required 
                    value={header}
                    onChange={(e, { value })=>{
                        this.setState({header:value})
                    }} 
                />
              </Card.Content>
              <Card.Content style={{padding: '0.5em 1em'}}>
                <Form.Field 
                    control={TextArea}
                    required 
                    autoHeight
                    style={{ minHeight: 100 }}
                    value={description}
                    onChange={(e, { value })=>{
                        this.setState({description:value})
                    }} 
                />
              </Card.Content>
              <Card.Content style={{padding: '0.5em 1em'}}>
                <Form.Field control={Select} 
                    options={
                        _.filter(users, (n)=>{
                            return n.key !== this.props.uid;
                        })
                    } 
                    placeholder='Select User' 
                    required 
                    search={true}
                    multiple={true}
                    value={sendTo}
                    onChange={(e, { value }) => {
                        this.setState({ sendTo:value })
                    }    
                } />
              </Card.Content>
              <Card.Content style={{padding: '0.5em 1em'}}>
                <Segment textAlign='center'>
                    <Label attached='top'>กำหนดส่งงาน</Label>
                    <DatePicker
                        inline
                        selected={deadline}
                        minDate={moment(this.props.feed.timestamp).add(1,'days')}
                        onChange={(date)=>this.setState({deadline: date})}
                    />
                </Segment>
              </Card.Content>
              <Card.Content extra style={{padding: '0.5em 1em'}}>
                <div className='ui two buttons'>
                    <Button basic icon color='green' onClick={()=>this.handleSubmit()}><Icon name="save"/> SAVE</Button>
                    <Button basic icon color='blue' onClick={handleCancel}><Icon name='edit'/> Cancel</Button>
                </div>
              </Card.Content>
              </Form>
            </Card>   
        );
    }
}

EditFeed.propTypes = {
    users: PropTypes.array.isRequired,
    feedUpdate: PropTypes.func.isRequired,
}

function mapStateToProps({ users }) {
    return { users }
}

export default connect(mapStateToProps,{feedUpdate})(EditFeed);