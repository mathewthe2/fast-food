import React from 'react';

import client from '../../../Client';

import moment from 'moment';

import {addPeak} from './addPeak';

//ms components
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';

import Dialog from '../../../styles/Dialog';

class AddPeakForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      peakTypes: [],
      store: {},

      peak: {time: moment(), 
              },
      hidden: true,

      //form input
      peakDate: new Date(),
      startTime: '',
      endTime: '',
      peakType: 4,
    };
  }

  componentDidMount() {
      //get peak types
      client.get('/peaktypes')
      .then(res => {
        let peakTypes = res.data.map(type => (
          {key: type.id, 
          text: type.type,
          demand: type.demand}
        ));
        this.setState({ peakTypes });
      });

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
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      hidden: nextProps.valueLink.value,
      peak: nextProps.peak
    });
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
      addPeak(peak);
      this.handleClose();
    } else {
      alert(this.validate())
    }
  }

  render() {

    const {peakTypes, peakDate, startTime, endTime} = this.state;

    // const current_date = moment(peak.time).toDate();
    // const current_month = moment(peak.time).format("YYYY-MM");
    // const current_hour = moment(peak.time).startOf('hour').format("HH:mm")
    // const nexdt_hour = moment(peak.time).startOf('hour').add(1, 'hours').format("HH:mm");
    
    return (

      <div>

      <Dialog
           buttonTitle = "Add Peak"
            title = "Add Peak"
            instruction = "Add peaks for this month."
            valueLink={{            
              value: this.state.hidden,
              requestChange: this.handleClose.bind(this),
              submitForm: this.handleSubmit.bind(this), 
          }}
                    >
          <form  onSubmit={this.handleSubmit}>

              {/* <p>Month to Plan</p>

              <input type="month" defaultValue={current_month} /> */}

              <DatePicker  value={peakDate}
              label="Date" 
              disableAutoFocus={true}
              onSelectDate={this.updateDate} />
              
              <TextField label="Start" type="time" defaultValue={startTime} onChanged={this.updateStartTime}/>
              <TextField label="End" type="time" defaultValue={endTime} onChanged={this.updateEndTime}/>

              <Dropdown
                  className='Dropdown-example'
                  label='Peak Type'
                  placeHolder='Pick peak type'
                  options={peakTypes}
                  defaultSelectedKey={4}
                  min={1}
                  onChanged={this.updatePeak}
                />

                </form>
        </Dialog>

        </div>
    );
  }
  
}

export default AddPeakForm;