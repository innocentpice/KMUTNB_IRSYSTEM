import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment';
import Markdown from "react-markdown";
import _ from 'lodash';

import { Card, Icon, Button, Progress, Image, Confirm } from 'semantic-ui-react';

import { feedAccept } from '../actions'

import EditFeed from './EditFeed';

class WorkTimeProgress extends Component {
    constructor(props){
        super(props);
        this.state = {
            complete: false,
            workTimePercent: 0
        }
        this.setWorkTime = this.setWorkTime.bind(this);
    }
    
    setWorkTime(){
        const workTime = moment(this.props.feed.deadline).diff(moment(this.props.feed.timestamp), 'second');
        const workRunTime = moment(moment()).diff(this.props.feed.timestamp, 'second');
        const haveTime = workTime - workRunTime;
        const percent = (workTime - haveTime) / workTime * 100;
        if(workTime){
            this.setState({
                workTimePercent: percent,
                runTrick: this.state.complete || percent>=100 ? null : setTimeout(this.setWorkTime,2000)
            });
        }
    }
    
    componentDidMount(){
        this.setWorkTime();
    }
    
    componentWillUnmount(){
        this.setState({
            complete: true,
            runTrick: null
        });
    }
    
    render(){
        return(
            <Progress 
                percent={this.state.workTimePercent}
                size='medium' 
                children='กำหนดวันส่งงาน' 
                indicating 
                autoSuccess 
                active
                attached='top'
            />
        );
    }
}

class FeedCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetail: false,
            edit: false
        }
    }
    
    render() {
        
        const DefFeed = ({feed}) =>{
            const Accpeted = _.isUndefined(_.findKey(feed.acceptor,(value,key)=>{return key===this.props.uid}))
            
            let lengthAC = 0;
            let lengthSD = 0;
        
            lengthAC = feed.acceptor ? Object.keys(feed.acceptor).length : 0;
            lengthSD = feed.sendTo ? Object.keys(feed.sendTo).length : 0;
            
            const celendarFormat = {
                sameDay: '[วันนี้ เวลา] LT',
                nextDay: '[พรุ่งนี้ เวลา] LT',
                nextWeek: 'llll',
                lastDay: '[เมื่อวานนี้ เวลา] LT',
                lastWeek: 'llll',
                sameElse: 'llll',
            }
            
            const onConfirmhander = () => {
                this.props.DelFeed(this.props.uid,{'key': feed.key,'sendTo':feed.sendTo});
            }
            
            const onCancelhander = () => {
                this.setState({openDelete: false})
            }
            
            const EditBtnhandler = () => {
                this.setState({edit: true});
            }
            
            const DeleteBtnhandler = () => {
                this.setState({openDelete: true});
            }
            
            const onAccepthandler = () => {
                this.props.feedAccept(this.props.uid,feed.key);
            }
            
            return (
                    <Card fluid key={feed.key}>
                        <WorkTimeProgress feed={feed} />
                      <Card.Content>
                        <Image floated='right' size='mini' src={'http://i.pravatar.cc/150?u='+feed.poster} alt='avatar' />
                        <Card.Header>
                            {feed.header}
                        </Card.Header>
                        <Card.Meta>
                            เริ่ม:&nbsp;
                            {moment(feed.timestamp).calendar(null,celendarFormat)}<br/>
                            กำหนดส่ง:&nbsp;
                            {moment(feed.deadline).calendar(null,celendarFormat)}<br/>
                            โดย:&nbsp;{feed.poster}<br/>
                        </Card.Meta>
                      </Card.Content>
                      <Card.Content description={<Markdown source={feed.description} escapeHtml/>}/>
                      {lengthSD !==0 && 
                        <Card.Content extra>
                            <Progress 
                                value={lengthAC}
                                total={lengthSD}
                                progress='ratio'
                                size='medium'
                                children='ผู้ตอบรับ' 
                                autoSuccess 
                                active
                            />
                        </Card.Content>
                      }
                      <Card.Content extra>
                        {
                            feed.poster === this.props.myEmail &&
                            <div className='ui two buttons'>
                                <Confirm
                                  open={this.state.openDelete}
                                  onCancel={onCancelhander}
                                  onConfirm={onConfirmhander}
                                />
                                <Button basic icon color='red'
                                    onClick={DeleteBtnhandler}
                                ><Icon name='trash'/> Delete</Button>
                                <Button basic icon color='blue' onClick={EditBtnhandler}><Icon name='edit'/> Edit</Button>
                            </div>    
                        }
                        {
                            feed.poster !== this.props.myEmail && 
                            <div className='ui two buttons'>
                                { Accpeted && <Button basic icon color='green' onClick={onAccepthandler}><Icon name='save' /> Accpet</Button>}
                                { !Accpeted && <Button disabled icon color='blue'><Icon name='save' /> Accpeted</Button>}
                            </div>    
                        }
                      </Card.Content>
                    </Card>      
            );
        }
        
        const Route = ({feed}) => {
            const editCancel = () => {
                this.setState({edit:false});
            }
            
            if(this.state.edit){
                return <EditFeed feed={feed} myEmail={this.props.myEmail} DelFeed={this.props.DelFeed} uid={this.props.uid} handleCancel={editCancel} />
            }else{
                return <DefFeed feed={feed} />
            }
        }
        
        function Check(key){
            if(!key){
                return 'none';
            }else{
                return 'block';
            }
        }
        
        return(
            <Card fluid style={{display: [Check(this.props.feed.header)],marginBottom: '3em'}}>
                { this.props.feed && <Route feed={this.props.feed}/> }
            </Card> 
        );
    }
}

FeedCard.propTypes = {
    feedAccept: PropTypes.func.isRequired,
}

function mapStateToProps({ users, feeds },Ownprop) {
    const feed = feeds[Ownprop.feedkey];
    return { users, feed }
}

export default connect(mapStateToProps,{feedAccept})(FeedCard);