import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { addCourse, updateCourse, deleteCourse } from '../actions';
import { Form, Select, Button } from 'semantic-ui-react'

class CourseTableForm extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      day: this.props.day,
      start: this.props.time,
      text: this.props.text,
      key: this.props.boxKey ? this.props.boxKey : false,
      maxduration: this.props.maxduration,
      duration: this.props.duration ? this.props.duration : 1,
      color: this.props.color ? this.props.color : 'teal'
    }
  }
  
  submitHandler = () => {
    if(this.state.key){
      this.props.updateCourse(this.state,this.props.success);
    }else{
      this.props.addCourse(this.state,this.props.success);
    }
  }

  render(){
    let durationTime = [],i;
    for(i=0;i<=this.state.maxduration-1;i++){
      durationTime[i] = { value: i+1, text: (i+1) + ' ชัวโมง'}
    }
    
    return(
      <Form style={{margin: '3em'}}>
        <Form.Group widths='equal'>
          <Form.Input label='หัวข้อ' placeholder='หัวข้อ' value={this.state.text} onChange={(e,{value})=>this.setState({text:value})} />
          { //<Form.Input label='ระยะเวลา (ชม.)' placeholder='ระยะเวลา' value={this.state.duration} onChange={(e,{value})=>this.setState({duration:value})}/>
          }
          <Form.Field 
            control={Select}
            label='ระยะเวลา' 
            options={durationTime}
            value={this.state.duration}
            placeholder='ระยะเวลา' 
            onChange={(e, { value }) => {
                this.setState({'duration': value});
            }    
          } />
          <Form.Field 
            control={Select}
            style={{color:this.state.color,backgroundColor: this.state.color}}
            label='สี' 
            options={
              [ 
                ..._.map(['teal','orange','yellow','olive','green','red','blue','grey','brown','pink','purple'],color=>{return {text:color,value:color,style:{color,backgroundColor:color}}})
              ]
            }
            value={this.state.color}
            placeholder='เลือกสี' 
            onChange={(e, { value }) => {
                this.setState({'color': value});
            }    
          } />
        </Form.Group>
        <Button compact color="blue" onClick={this.submitHandler}>บันทึก</Button>
        {this.state.key && <Button compact color="red" onClick={()=>{this.props.deleteCourse(this.state,this.props.success)}}>ลบ</Button> }
        <Button compact onClick={this.props.success}>ยกเลิก</Button>
      </Form> 
    );
  }
}

CourseTableForm.propTypes = {
  updateCourse: PropTypes.func.isRequired,
  addCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired
}

export default connect(null, {
  addCourse,
  updateCourse,
  deleteCourse
})(CourseTableForm);