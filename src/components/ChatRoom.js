import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import _ from 'lodash';

import { Menu, Header, Form, Button, Comment, Icon, Dropdown, Divider, Grid, Image } from 'semantic-ui-react'

import { chatSelect, chatPush } from '../actions';

const Chatitem = ({ poster, msg, time, me = false }) => {

    if (me) {
        return (
            <Comment 
                style={{
                    padding: '1em', 
                    margin: '0.5em', 
                    borderRadius: '1em',
                    backgroundColor: '#fff',
                    textAlign: 'right',
                    float: 'right',
                    maxWidth: '70%',
                    clear: 'both'
                }}
            >
              <Comment.Content>
                <Comment.Metadata style={{margin: 0}}>
                  <div>{moment(time).calendar()}</div>
                </Comment.Metadata>
                <Comment.Text>{msg}</Comment.Text>
              </Comment.Content>
            </Comment>
        );
    }

    return (
        <Comment 
            style={{
                padding: '1em', 
                margin: '0.5em', 
                borderRadius: '1em',
                backgroundColor: '#fff',
                maxWidth: '70%',
                clear: 'both'
            }}
        >
          <Comment.Avatar src={'http://i.pravatar.cc/150?u='+poster} />
          <Comment.Content>
            <Comment.Metadata style={{margin: 0}}>
              <div>{moment(time).calendar()}</div>
            </Comment.Metadata>
            <Comment.Text>{msg}</Comment.Text>
          </Comment.Content>
        </Comment>
    );
}

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectUser: [],
            messages: [],
            roomKey: '',
            msgBox: '',
            activeUser: ''
        }
    }

    componentDidMount() {
        const { scrollbars } = this.refs;
        scrollbars && scrollbars.scrollToBottom();
    }
    componentDidUpdate() {
        const { scrollbars } = this.refs;
        scrollbars && scrollbars.scrollToBottom();
    }
    
    ListDD = () => {
        return (
            <Dropdown
                fluid
                search
                selection
                placeholder={this.props.chats.matename ? this.props.chats.matename : 'SELECT USER'}
                options={
                    _.filter(this.props.users, (n)=>{
                        return n.key !== this.props.auth.uid;
                    })
                }
                onChange={(e, { value}) => {
                    const myKey = [this.props.auth.uid,this.props.auth.email];
                    let mateKey = _.find(this.props.users,{'key':value});
                    mateKey = [mateKey.key,mateKey.text];
                    this.props.chatSelect(myKey,mateKey);
                }}
            />
        );
    }

    render() {
        return (
            <div>
                <Header>
                    ChatRoom <Icon name='chat' />
                </Header>
                <Divider/>
                <Grid>
                    <Grid.Column width={6}>
                        <Scrollbars
                            renderTrackHorizontal={(props)=><span style={{display: 'none', visibility: 'hidden'}}/>} 
                            renderThumbHorizontal={(props)=><span style={{display: 'none', visibility: 'hidden'}}/>} 
                            renderView={props => <div {...props} style={{...props.style,overflowX: 'hidden',paddingBottom:'1em'}} />}
                            style={{ height: '20em',width: '100%',margin:'1em 0px'}}
                        >
                            <Menu secondary vertical>
                            {_.map(
                            _.filter(this.props.users, (n)=>{
                                return n.key !== this.props.auth.uid;
                            }),
                            (item)=>{
                                return (
                                    <Menu.Item
                                        key={item.key}
                                        name={item.key}
                                        active={this.state.activeUser === item.key}
                                        onClick={()=>{
                                            const myKey = [this.props.auth.uid,this.props.auth.email];
                                            const mateKey = [item.key,item.text];
                                            this.props.chatSelect(myKey,mateKey);
                                            this.setState({activeUser: item.key});
                                        }}
                                    >
                                        <Header as='h5'>
                                            <Image src={item.image.src} size='small' avatar="avatar" />
                                            <span> {_.slice(item.text,0,15)}{item.text[16] && "..."}</span>
                                        </Header>
                                    </Menu.Item>
                                );
                            })}
                            </Menu>
                        </Scrollbars>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        {
                            this.props.chats.roomkey &&
                            <div>
                                <Scrollbars 
                                    ref="scrollbars" 
                                    renderTrackHorizontal={(props)=><span style={{display: 'none', visibility: 'hidden'}}/>} 
                                    renderThumbHorizontal={(props)=><span style={{display: 'none', visibility: 'hidden'}}/>} 
                                    renderView={props => <div {...props} style={{...props.style,overflowX: 'hidden',paddingBottom:'1em'}} />}
                                    style={{ height: '20em',width: '100%',margin:'1em 0px'}}
                                >
                                 <Comment.Group style={{maxWidth: '98%'}}>
                                    {
                                        this.props.chats.messages && _.map(this.props.chats.messages,(msg,key)=>{
                                            return <Chatitem key={key} poster={msg.by} msg={msg.msg} time={msg.timestamp} me={this.props.auth.email === msg.by}/>
                                        })
                                    }
                                 </Comment.Group>
                                </Scrollbars>
                                <Form reply>
                                    <Form.Input value={this.state.msgBox} onChange={(e) => this.setState({ 'msgBox': e.target.value})} />
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
                    </Grid.Column>
                </Grid>
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

export default connect(mapStateToProps, { chatSelect, chatPush })(ChatRoom);
