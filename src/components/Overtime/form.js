import React from 'react';
import moment from 'moment';

//ms components
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import {addOvertime} from './addOvertime';
//locale
// import localization from '../../locale/common';

import './form.css';


class OvertimeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      hello: '',
      showModal: false,

      //form
      date: new Date(),
      startTime: moment().format("HH:mm"),
      duration: '',
      type: 'Cleaning',
      remarks: '',

    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.valueLink.value,
    });

  }

  componentDidMount() {

    // this.setLanguage();

  }

  // getOverTimeList =() => {
  //   client.get('/overtime')
  //   .then(res => {
  //     const overtime = res.data;
  //     this.setState({ overtime });
  //     this.setState({ filtered_items: overtime});
  //   });
  // }

  handleClose = () => {
    this.setState({showModal: false})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {date, startTime, duration, type, remarks} = this.state;
    const ot = {
      employee: this.props.person.id,
      date: date,
      startTime: startTime,
      duration: duration,
      type: type.text || type,
      remarks: remarks
    }
    addOvertime(ot, ()=>{
      this.handleClose();
    });
  }

  updateDate = (d) => this.setState({date: d });
  updateStartTime = (d) =>  this.setState({startTime: d });
  updateDuration = (t) => this.setState({duration: t });
  updateOtType = (t) => this.setState({type: t });
  updateRemarks = (t) => this.setState({remarks: t });
  


//   setLanguage = () => {
//     localization.setLanguage(new URLSearchParams(this.props.location.search).get('lang') || 'en');
//     this.setState({});
//  }


  render() {

    const {person} = this.props;
    const {date, startTime} = this.state;

    let otTypes = [
      { key: 1,
        text: 'Cleaning'
      },
      { key: 2,
        text: 'Transporting goods'
      },
      { key: 3,
        text: 'Kitchen Maintenance'
      },
      { key: 4,
        text: 'Cashier Maintenance'
      },
      { key: 5,
        text: 'Customer Service'
      },
      { key: 6,
        text: 'Other'
      }
    ]
   
    return (
      <div>
         

         <Modal
          isOpen={ this.state.showModal }
          onDismiss={ this.handleClose }
          isBlocking={ false }
          containerClassName='ms-modalExample-container'
        >
          <div className='ms-modalExample-header'>
            <span>Overtime Application Form</span>
          </div>
          <div className='ms-modalExample-body'>
            <form>
              <p>Name: {person.firstName} {person.lastName}</p>
              <p>Position: {person.role} ({person.contract})</p>
              <p>StoreID: 1</p>

              <DatePicker  value={date}
              label="Date" 
              disableAutoFocus={true}
              onSelectDate={this.updateDate} />
            
             <TextField label="Start" type="time" defaultValue={startTime} onChanged={this.updateStartTime}/>
             <TextField label="Duration" defaultValue="1 hour" onChanged={this.updateDuration}/>

             <Dropdown
                  label='Type'
                  options={otTypes}
                  defaultSelectedKey={1}
                  onChanged={this.updateOtType}
                />
              
              <TextField label="Remarks" onChanged={this.updateRemarks}/>

        
              <DialogFooter>
              <PrimaryButton onClick={ this.handleSubmit } type="submit" text='Submit' />
              <DefaultButton onClick={ this.handleClose } text='Cancel' />
            </DialogFooter>


            </form>
          </div>
        </Modal>

         

        
      </div>
    );
  }
}

export default OvertimeForm;