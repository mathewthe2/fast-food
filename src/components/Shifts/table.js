import React from 'react';
import client from '../../Client';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import Timeline from 'react-calendar-timeline/lib';

import AddPeakForm from './Plan/addPeakForm';

//styles
import './styles.css';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const startTime = 6; //6 am
const endTime = 23; //11 pm

const startDate = '2017-12-10';
const endDate = '2017-12-25';

// const groups = [
//   {id: 1, title: 'group 1'},
//   {id: 2, title: 'group 2'}
// ]

// const items = [
//   {id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour')},
//   {id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
//   {id: 3, group: 1, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')}
// ]

class ShiftTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: [],
      shifts: [],
      manHours: [],
      peakHours: [],

      regularStaffDemand: 0,

      hideAddPeakForm: true,
      peakPrototype: {},
    };
  }

  loadTable() {
      this.getPersonList();
      this.getShifts();
      this.getManPower();
      this.getRegularStaffDemand(()=>this.getPeakHours());
      // this.getPeakHours();
  }

  getPeakHours = () => {
    client.get(`/peakhours?startDate=${startDate}&endDate=${endDate}`)
    .then(res => {
      let peakHours = res.data.map((peakHour)=> (
          {id: `peakhour ${peakHour.id}`,
            group: 'peakhour',
            title: (peakHour.demand*this.state.regularStaffDemand).toFixed(1),
            start_time: moment(peakHour.peakTime),
            end_time: moment(peakHour.peakTime).add(1, 'hours') }
      ));

      this.setState({peakHours});

    });
  }

  getPersonList = () => {
    client.get('/personlist')
    .then(res => {
      let persons = res.data.map(person => (
        {id: person.personId, 
        title: `${person.firstName} ${person.lastName}`}
      ));
      this.setState({ persons });
    });
  }

  getRegularStaffDemand = (callback) => {
    client.get(`/stores/1`)
    .then(res => {
      const regularStaffDemand = res.data[0].regularStaffDemand;
      this.setState({ regularStaffDemand });
      callback();
    });
  }

  getShifts = () => {
    client.get('/shifts')
    .then(res => {
      //"shift": "[\"2017-12-25 11:00:00\",\"2017-12-25 12:00:00\"]",
      const timeLength = 22;
      let shifts = res.data.map((shift)=> (
          {id: shift.shiftId, 
            group: shift.employee,
            title: shift.summary,
            start_time: moment(shift.shift.substr(2, timeLength)),
            end_time: moment(shift.shift.substr(-timeLength-2, timeLength))}
      ));
      this.setState({ shifts });
    });
  }

  getManPower = () => {
    client.get(`/manpower?startDate=${startDate}&endDate=${endDate}`)
    .then(res => {
      let manHours = res.data.map((manHour, index)=> (
          {id: `manpower ${index}`, 
            group: 'manpower',
            className: 'manpower',
            title: manHour.manPower,
            start_time: moment(manHour.start),
            end_time: moment(manHour.start).add(1, 'hours') }
        ))
        this.setState({manHours});
    }
           // let length = 0;
       //   let manHours = res.data.map((manHour, index)=>  {
       //     if (index === 0) {
       //     const h = res.data[0];
       //     const e = 
       //     ({id: `manpower ${index}`, 
       //       group: 'manpower',
       //       className: 'manpower',
       //       title: 1,
       //       start_time: moment(h.start),
       //       end_time: moment(h.start).add(1 , 'hours') });
       //       console.log(e);
       //     return e
       //     }
       //     if (res.data[index].manPower!== res.data[index-1].manPower) {
       //       const dateLength = length;
       //       length = 0;
       //       const h = res.data[index-1];
       //       const e = 
       //       ({id: `manpower ${index-1}`, 
       //         group: 'manpower',
       //         className: 'manpower',
       //         title: h.manPower,
       //         start_time: moment(h.start),
       //         end_time: moment(h.start).add(dateLength , 'hours') });
       //         console.log(e);
       //       return e
       //     } else {
       //       console.log("adding 1")
       //       length += 1;
       //       return null
       //     }
       //   }).filter(manHour => manHour !== null)
    )};
  

  componentDidMount() {
    this.loadTable();
     
  }

  handleCanvasClick = (groupId, time) => {
    if (groupId === "peakhour") {
      let peakPrototype = {
        time: moment(time),
      }
      this.setState({peakPrototype});
      this.setState({hideAddPeakForm: false})
    }
  }

  closeAddPeakForm = () => {
    this.setState({hideAddPeakForm: true})
  }

  render() {
    let manPower = {id: 'manpower', title: 'Manpower'};
    let peaks = {id: 'peakhour', title: 'Peaks'};

    const {persons, shifts, manHours, peakHours, peakPrototype} = this.state;
    
    return (
      <div>
        <Timeline groups={[...persons, manPower, peaks]}
              items={[...shifts, ...manHours, ...peakHours]}
              defaultTimeStart={moment('2017-12-15').startOf('day').add(startTime, 'hour')}
              defaultTimeEnd={moment('2017-12-15').startOf('day').add(endTime, 'hour')} 
              canMove={false}
              onCanvasClick={this.handleCanvasClick}
          />

          <AddPeakForm 
          peak={peakPrototype}
            valueLink={{            
              value: this.state.hideAddPeakForm,
              requestChange: this.closeAddPeakForm.bind(this),
              updateTable: this.loadTable.bind(this)
          }}
          />
      {/* <BigCalendar
        events={events}
        style={{height: 500,
        width:'inherit',}}
        // startAccessor='startDate'
        // endAccessor='endDate'
        defaultDate={new Date()}
      /> */}
    </div>
    );
  }
}

export default ShiftTable;