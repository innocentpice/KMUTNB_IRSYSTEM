import React, { Component } from 'react'  // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Table } from 'material-ui/Table'
import { TableHeader } from 'material-ui/Table'
import { TableHeaderColumn } from 'material-ui/Table'
import { TableRow } from 'material-ui/Table'
import { TableRowColumn } from 'material-ui/Table'
import { TableBody } from 'material-ui/Table'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class DayTimeTable extends Component {
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    }
  }
  
  render () {
    const {
      calcCellHeight,
      caption,
      cellKey,
      data,
      hideHeaders,
      hideTimes,
      isActive,
      rowNum,
      showCell,
      showHeader,
      showTime,
      tableProps,
      timeText,
      toolTip,
      valueKey,
      getBox,
      selectBoxHandler
    } = this.props
    const headerStyle = {
      border: '1px solid rgb(224, 224, 224)',
      backgroundColor: '#262f3d',
      color: 'rgba(255,255,255,.7)',
      fontSize: '1rem',
      textAlign: 'center'
    }
    var headers = _.map(data,(day, ii) => {
      return <TableHeaderColumn 
                style={headerStyle} 
                key={ii}
              >
              {showHeader(day)}</TableHeaderColumn>
    })
    var colNum = headers.length
    var grid = []
    var found = new Map()

    for (let ii = 0; ii < rowNum; ii++) {
      grid[ii] = []
      for (let jj = 0; jj < colNum; jj++) {
        grid[ii][jj] = 0
        data[jj][valueKey].map((cell) => {
          if (isActive(cell, ii)) {
            grid[ii][jj] = {
              height: calcCellHeight(cell),
              info: {...cell}
            }
            if (found.get(cellKey(cell))) {
              grid[ii][jj].skip = true
            } else {
              grid[ii][jj].first = true
              found.set(cellKey(cell), true)
            }
          }
          return false;
        })
      }
    }

    return (
      <Table
        muiTheme={this.context.muiTheme}
        selectable={false}
        {...tableProps}
        style={{borderBottom: '1px solid rgb(224, 224, 224)'}}
      >
        { !hideHeaders &&
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            { !!caption &&
              <TableRow>
                <TableHeaderColumn
                  colSpan={colNum + !hideTimes}
                  tooltip={toolTip}
                  style={{textAlign: 'center'}}
                >
                  {caption}
                </TableHeaderColumn>
              </TableRow>
            }
            <TableRow>
              { !hideTimes &&
                <TableHeaderColumn
                  style={headerStyle}
                >{timeText}</TableHeaderColumn>
              }
              { headers }
            </TableRow>
          </TableHeader>
        }
        <TableBody
          displayRowCheckbox={false}
        >
        {
          grid.map((row, ii) => {
            var cellStyle={
              borderRight: '1px solid rgb(224, 224, 224)',
              borderLeft: '1px solid rgb(224, 224, 224)'
            }

            return (
              <TableRow key={ii}>
                { !hideTimes &&
                  <TableRowColumn
                    style={cellStyle}
                  >{showTime(ii)}</TableRowColumn>
                }
                {
                  row.map((xx, jj) => {
                    if (!xx.info) {
                      return <TableRowColumn
                        key={`${ii}-${jj}`}
                        style={{...cellStyle,padding:0,verticalAlign: 'middle'}}
                      >
                        <div
                          style={{width: '100%',height: '100%',verticalAlign: 'middle'}}
                          onClick={()=>{
                            selectBoxHandler(getBox(ii),jj,{})
                          }}
                        ></div>
                      </TableRowColumn>
                    }
                    else if (xx.first) {
                      if (!xx.info.props) {
                        xx.info.props = {style: ''}
                      }
                      return (
                        <TableRowColumn
                          key={cellKey(xx.info)}
                          rowSpan={xx.height}
                          {...xx.info.props}
                          style={{...cellStyle,padding:0}}
                          //style={{...Object.assign(xx.info.props.style, cellStyle),padding:0,verticalAlign: 'middle'}}
                        >
                          <div
                            {...xx.info.props}
                            //style={{lineHeight:'100%',width: '100%',height: '100%',verticalAlign: 'middle'}}
                            style={{...xx.info.props.style,width: '100%',height: '100%',padding:0,verticalAlign: 'middle'}}
                            onClick={()=>{
                              selectBoxHandler(getBox(ii),jj,{...xx.info,duration:calcCellHeight(xx.info)})
                            }}
                          > 
                            <span
                              style={{...xx.info.props.style,lineHeight: 4*xx.info.duration,padding:0,verticalAlign: 'middle'}}
                            >
                              {showCell(xx.info)}
                            </span>
                          </div>
                        </TableRowColumn>
                      )
                    }
                    else if (xx.skip) {
                      return false;
                    }
                    return false;
                  })
                }
              </TableRow>
            )
          })
        }
        </TableBody>
      </Table>
    )
  }
}

DayTimeTable.propTypes = {
  calcCellHeight: PropTypes.func.isRequired,
  caption: PropTypes.string,
  cellKey: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  hideHeaders: PropTypes.bool,
  hideTimes: PropTypes.bool,
  isActive: PropTypes.func.isRequired,
  rowNum: PropTypes.number.isRequired,
  showCell: PropTypes.func.isRequired,
  showHeader: PropTypes.func.isRequired,
  showTime: PropTypes.func.isRequired,
  tableProps: PropTypes.object,
  timeText: PropTypes.string,
  toolTip: PropTypes.string,
  valueKey: PropTypes.string.isRequired
}

DayTimeTable.defaultProps = {
  timeText: 'เวลา',
  toolTip: ''
}

DayTimeTable.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
}

export default DayTimeTable;