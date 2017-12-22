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
      peakDate: new Date(),
      startTime: '',
      endTime: '',
      peakType: 4,
      summary: 'DUTY,'
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
      peak: nextProps.peak,
    });
    let persons = nextProps.persons.map(person => (
      {key: person.id, 
      text: person.title,
      }
    ));
    this.setState ({persons})



    const peak = nextProps.peak;
    if (peak) {
      this.setState({
        peakDate: moment(peak.time).toDate(),
        startTime: moment(peak.time).startOf('hour').format("HH:mm"),
        endTime: moment(peak.time).startOf('hour').add(1, 'hours').format("HH:mm")
      })
    }
  }

  updateDate = (date) => {
    this.setState({
      peakDate: date
    })
  }

  updateStartTime = (time) => {
    this.setState({startTime: time})
  }

  updateEndTime = (time) => {
    this.setState({endTime: time})
  }

  updatePeak = (peakTypeObj) => {
    this.setState ({
      peakType: peakTypeObj.key
    })
  }

  updateSummary = (t) => this.setState({summary: t});

  validate = () => {
    const {startTime, endTime, peakType} = this.state;
    if (startTime >= endTime) {
      return "End date needs to be after start date."
    }
    if (peakType < 1) {
      return "Please choose peak type."
    }
    return "Pass"
  }

  handleSubmit = () => {
    // e.preventDefault();
    if (this.validate() === "Pass") {
      const date = moment(this.state.peakDate).format('DD/MM/YYYY');
      const peak = {
        peakType: this.state.peakType,
        startDate: moment(date + ' ' + this.state.startTime, 'DD/MM/YYYY HH:mm').toDate(),
        endDate: moment(date + ' ' + this.state.endTime, 'DD/MM/YYYY HH:mm').toDate(),
      }
      this.addPeak(peak);
      this.handleClose();
    } else {
      alert(this.validate())
    }
  }

 addPeak = (peak) => {
    const start = moment(peak.startDate);
    const end = moment(peak.endDate);
    const hourDifference = moment.duration(end.diff(start)).asHours();
  
    var params = new URLSearchParams();
    params.append('times', hourDifference);
    params.append('startTime', start.format('YYYY-MM-DD HH:mm:ssZZ'));
    params.append('peakType', peak.peakType);

    client.get(`/addpeak?${params.toString().replace('+', ' ')}`)
    .then(()=> {
      this.props.valueLink.updateTable();
      this.props.valueLink.requestChange(); //close add peak form
    });

  }

  render() {

    const {persons, peakDate, startTime, endTime} = this.state;

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
                  onChanged={this.updatePeak}
                />

              <DatePicker  value={peakDate}
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