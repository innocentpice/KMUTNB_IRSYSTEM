import React, { Component } from 'react'
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DayTimeTable from '../components/DayTimeTable';
import CourseTableForm from '../components/CourseTableForm';

import { getCourseAll } from '../actions';

import { Dimmer, Loader, Modal} from 'semantic-ui-react'

class CourseTable extends Component {
    
    constructor(props){
      super(props);
      this.state = {
        modal: false,
      }
      this.selectBoxHandler = this.selectBoxHandler.bind(this);
    }
    
    selectBoxHandler(time,day,{text,key,duration,props = {style: ''}}){
      
      if(this.props.auth.email !== 'admin@admin.com'){
        return false;
      }
      
      const { backgroundColor } = props.style.backgroundColor ?  props.style : {backgroundColor: ''};
      
      const atStart = moment().hour(time);
      let maxduration = moment().hour(19).diff(atStart,'h');
      
      this.props.coursetable[day].info.map(info=>{
        const start = moment().hour((info.start).slice(0,2));
        
        if(atStart < start){
          maxduration = maxduration > start.diff(atStart,'h') ? start.diff(atStart,'h') : maxduration;
        }
        return false;
      });
      this.setState({
        modal: true,
        boxKey: key,
        time,day,text,maxduration,duration,color:backgroundColor
      });
    }
    
    componentDidMount(){
      this.props.getCourseAll();
    }
    
    render(){
      var intervalMinutes = 60
      var interval = moment.duration(intervalMinutes, 'minutes')
      var min = moment('08:00', 'HH:mm')
      var max = moment('19:00', 'HH:mm')
  
      function displayCell(xx) {
        return xx.text
      }
      function calcHeight(xx) {
        return moment(xx.end, 'HH:mm').diff(moment(xx.start, 'HH:mm')) / interval
      }
      function displayHeader(xx) {
        return moment().day(xx.name).format("dddd")
      }
      
      function isActive(xx, step) {
        var current = moment(min).add(step * interval)
        return moment(xx.start, 'HH:mm') <= current &&
               current < moment(xx.end, 'HH:mm')
      }
      
      function getBox(step){
         var start = moment(min).add(interval * step)
         return `${start.format('H')}`;
      }
      
      function showTime(step) {
        var start = moment(min).add(interval * step)
        return `${start.format('LT')} น.`;
      }
      
      function key(xx) {
        return xx.key
      }
      const Check = () => {
        if(this.props.coursetable[0]){
          return(
            <div>
              { this.state.modal &&
              <Modal
                open={this.state.modal}
                onClose={()=>{this.setState({modal: false})}}
                header={
                  moment().day(this.state.day).format("dddd") +
                  ' เวลา ' +
                  moment().hour(this.state.time).format('HH:00')
                }
                content={<CourseTableForm {...this.state} success={()=>this.setState({modal:false})}/>}
                closeIcon
              />}
              <DayTimeTable
                selectBoxHandler={this.selectBoxHandler}
                getBox={getBox}
                cellKey={key}
                calcCellHeight={calcHeight}
                showHeader={displayHeader}
                showCell={displayCell}
                showTime={showTime}
                isActive={isActive}
                max={max}
                min={min}
                data={this.props.coursetable}
                rowNum={(max-min)/interval}
                valueKey="info"
              />
            </div>
          );
        }else{
          return(
            <Dimmer active inverted style={{backgroundColor: '#fafafa',marginTop: '5%'}}>
              <Loader inverted content='Loading' size='large' />
            </Dimmer>
          );
        }
      }
      return(
        <Check />
      );
    }
}


CourseTable.propTypes = {
    getCourseAll: PropTypes.func.isRequired,
    addCourse: PropTypes.func.isRequired
}

function mapStateToProps({ coursetable }) {
  return { coursetable }
}

export default connect(mapStateToProps, {
  getCourseAll
})(CourseTable);
