import React from 'react';

import client from '../../../Client';

import moment from 'moment';

// import {addPeak} from './addPeak';

//ms components
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';

import Dialog from '../../../styles/Dialog';

class AddShfitForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      peakTypes: [],
      store: {},
      persons: [],

      peak: {time: moment(), 
              },
      hidden: true,

      //form input
      shiftDate: new Date(),
      startTime: '08:00',
      endTime: '16:00',
      peakType: 4,
      summary: 'DUTY',
      employee: 0,
    };
  }

  componentDidMount() {
      //get peak types
      // client.get('/peaktypes')
      // .then(res => {
      //   let peakTypes = res.data.map(type => (
      //     {key: type.id, 
      //     text: type.type,
      //     demand: type.demand}
      //   ));
      //   this.setState({ peakTypes });
      // });

      client.get(`/stores/1`)
      .then(res => {
        const store = res.data[0];
        this.setState({ store });
      });
  }

  handleOpen = () => {
    this.setState({hidden: false});
  };

  handleClose = () => {
    this.setState({hidden: true});
    this.props.valueLink.requestChange(true);
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      hidden: nextProps.valueLink.value,
    });
    let persons = nextProps.persons.map(person => (
      {key: person.id, 
      text: person.title,
      }
    ));
    this.setState ({persons})


  }

  updateDate = (date) => {
    this.setState({
      shiftDate: date
    })
  }

  updateStartTime = (time) => {
    this.setState({startTime: time})
  }

  updateEndTime = (time) => {
    this.setState({endTime: time})
  }

  updateEmployee = (obj) => {
    this.setState ({
      employee: obj.key
    })
  }

  updateSummary = (t) => this.setState({summary: t});

  validate = () => {
    // const {startTime, endTime, employee} = this.state;
    // if (startTime >= endTime) {
    //   return "End date needs to be after start date."
    // }
    // if (employee <= 0) {
    //   return "End date needs to be after start date."
    // }
    return "Pass"
  }

  handleSubmit = () => {
    // e.preventDefault();
    if (this.validate() === "Pass") {
      const date = moment(this.state.shiftDate).format('DD/MM/YYYY');

        const startDate =  moment(date + ' ' + this.state.startTime, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ssZZ');
        const endDate = moment(date + ' ' + this.state.endTime, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ssZZ');
        const shift = '["' +  startDate.slice(0, -2) + '","' + endDate.slice(0, -2) + '"]';

      const shiftObj = {
        employee: this.state.employee,
        shift: shift,
        summary: this.state.summary,
      }
      this.addShift(shiftObj, ()=> this.handleClose());

    } else {
      alert(this.validate())
    }
  }

 addShift = (shift, callback) => {

    var params = new URLSearchParams();
    params.append('employee', shift.employee);
    params.append('shift',  shift.shift);
    params.append('summary', shift.summary);

    console.log(params)

    client.get(`/addshift?${params.toString()}`)
    .then(()=> {
      this.props.valueLink.updateTable();
      this.props.valueLink.requestChange(); //close add peak form
      callback();
    });

  }

  render() {

    const {persons, shiftDate, startTime, endTime} = this.state;

    return (

      <div>

      <Dialog
           buttonTitle = "Add Shift"
            title = "Add Shift"
            instruction = "Add shifts for this month."
            valueLink={{            
              value: this.state.hidden,
              requestChange: this.handleClose.bind(this),
              submitForm: this.handleSubmit.bind(this), 
          }}
                    >
          <form  onSubmit={this.handleSubmit}>

              {/* <p>Month to Plan</p>

              <input type="month" defaultValue={current_month} /> */}

              <Dropdown
                  className='Dropdown-example'
                  label='Employee'
                  options={persons}
                  defaultSelectedKey={4}
                  min={1}
                  onChanged={this.updateEmployee}
                />

              <DatePicker  value={shiftDate}
              label="Date" 
              disableAutoFocus={true}
              onSelectDate={this.updateDate} />
              
              <TextField label="Start" type="time" defaultValue={startTime} onChanged={this.updateStartTime}/>
              <TextField label="End" type="time" defaultValue={endTime} onChanged={this.updateEndTime}/>
              <TextField label="Summary"  defaultValue={this.state.summary} onChanged={this.updateSummary}/>
 

                </form>
        </Dialog>

        </div>
    );
  }
  
}

export default AddShfitForm;