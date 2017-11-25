import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import _ from 'lodash';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Header, Button, Form, Input, TextArea, Segment, Icon, Select, Label, Dimmer, Loader} from 'semantic-ui-react'

import { feedAdd } from '../actions'

class AddFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feed: [],
            sendTo: '',
            desctiption: '',
            header: '',
            startDate: moment(),
            endDate: moment().add(1,'days'),
            loading: false
        }
    }
    
    handleAddFeed = (newFeed) =>{
        this.props.feedAdd(newFeed,this.props.auth.uid,this.props.goDashBoard)
        this.setState({loading: true});
    }

    render() {
        return (
            <Form 
                size='large' 
                style={{marginBottom: '1em'}}
                onSubmit={()=>{
                    const newFeed = {
                        description: this.state.desctiption, 
                        header: this.state.header, 
                        poster: this.props.auth.email, 
                        sendTo: this.state.sendTo , 
                        timestamp: moment(this.state.startDate).toString(),
                        deadline: moment(this.state.endDate).toString()
                    };
                    this.handleAddFeed(newFeed);
                    this.setState({
                        desctiption: '',
                        header: ''
                    })
                }}
            >   
                <Dimmer active={this.state.loading}>
                  <Loader size='big'>กำลังบันทึก</Loader>
                </Dimmer>
                <Header as='h2' color='teal' textAlign='center'>
                    สร้างข่าวสาร / งาน
                </Header>
                <Segment stacked>
                    <Form.Field 
                        control={Input} 
                        label='หัวข้องาน' 
                        placeholder='หัวข้องาน' 
                        required 
                        value={this.state.header}
                        onChange={(e)=>{
                            this.setState({
                                header: e.target.value
                            });
                        }} 
                    />
                    <Form.Field 
                        control={TextArea}
                        label='รายละเอียดงาน' 
                        placeholder='รายละเอียดงาน' 
                        required 
                        value={this.state.desctiption}
                        onChange={(e)=>{
                            this.setState({
                                desctiption: e.target.value
                            });
                        }} 
                    />
                    <Form.Field control={Select} 
                        label='ส่งถึง' 
                        options={
                            _.filter(this.props.users, (n)=>{
                                return n.key !== this.props.auth.uid;
                            })
                        } 
                        placeholder='กรุณาเลือกผู้ใช้' 
                        search={true}
                        multiple={true}
                        onChange={(e, { value }) => {
                            this.setState({'sendTo': value});
                        }    
                    } />
                    <Segment textAlign='center'>
                        <Label attached='top'>กำหนดส่งงาน</Label>
                        <DatePicker
                            inline
                            selected={this.state.endDate}
                            minDate={moment().add(1,'days')}
                            onChange={(date)=>this.setState({endDate: date})}
                        />
                    </Segment>
                    <Button fluid type='submit' primary><Icon name="plus"/>เพิ่ม</Button>
                </Segment>
            </Form>
        );
    }
}

AddFeed.propTypes = {
    goDashBoard: PropTypes.func.isRequired,
    feedAdd: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
}

function mapStateToProps({ users }) {
    return { users };
}

export default connect(mapStateToProps, {feedAdd})(AddFeed);
