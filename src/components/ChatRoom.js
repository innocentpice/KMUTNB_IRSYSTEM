import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Header, Divider, Item, Form, Button, Select } from 'semantic-ui-react'

import { chatSelect,chatPush } from '../actions';

const Chatitem = ({ poster, msg, time }) =>
    <Item>
      <Item.Content>
        <Item.Header as='a'>{poster} : {msg}</Item.Header>
        <Item.Meta>
          <span className='cinema'>{new Date(time).toLocaleString()}</span>
        </Item.Meta>
      </Item.Content>
    </Item>;

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectUser: [],
            messages: [],
            roomKey: '',
            msgBox: '',
        }
    }

    componentDidUpdate() {
        const obj = document.getElementById('ChatBox');
        if(obj){
            obj.scrollTop = obj.scrollHeight;
        }
    }

    render() {
        return (
            <div>
                <Header>
                    ChatRoom
                </Header>
                <Form>
                    <Form.Field 
                        control={Select} 
                        label='Send To' 
                        options={
                            _.filter(this.props.users, (n)=>{
                                return n.key !== this.props.auth.uid;
                            })
                        } 
                        placeholder='Select User' 
                        required 
                        search={true}
                        onChange={(e, { value}) => {
                            const myKey = [this.props.auth.uid,this.props.auth.email];
                            let mateKey = _.find(this.props.users,{'key':value});
                            mateKey = [mateKey.key,mateKey.text];
                            this.props.chatSelect(myKey,mateKey);
                        }    
                    } />
                </Form>
                
                <Divider />
                {
                    this.props.chats.roomkey &&
                    <div>
                        <Item.Group id={'ChatBox'} divided style={{maxHeight: '20em', overflowY: 'scroll'}}>
                            {
                                this.props.chats.messages && _.map(this.props.chats.messages,(msg,key)=>{
                                    return <Chatitem key={key} poster={msg.by} msg={msg.msg} time={msg.timestamp} />
                                })
                            }
                        </Item.Group>
                        <Form reply>
                            <Form.TextArea value={this.state.msgBox} onChange={(e) => this.setState({ 'msgBox': e.target.value})} />
                            <Button content = 'ส่งข้อความ'
                            labelPosition = 'left'
                            icon = 'send'
                            onClick={()=>{
                                this.props.chatPush(this.props.auth.email,this.props.chats.roomkey,this.state.msgBox);
                                this.setState({'msgBox': ''});
                            }}
                            primary / >
                        </Form>
                    </div>
                }
            </div>
        );
    }
}

ChatRoom.propTypes = {
    chats: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    chatPush: PropTypes.func.isRequired,
    chatSelect: PropTypes.func.isRequired
}

function mapStateToProps({ chats }) {
    return { chats }
}

export default connect(mapStateToProps, {chatSelect,chatPush})(ChatRoom);
