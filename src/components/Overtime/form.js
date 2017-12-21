import React from 'react';
import client from '../../Client';

//ms components
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
//locale
import localization from '../../locale/common';

import './form.css';


class OvertimeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      hello: '',
      showModal: false,

      //form
      date: new Date(),
      duration: '',
      type: 1,

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

  updateDate = (d) => this.setState({date: d });
  updateDuration = (t) => this.setState({duration: t });
  updateOtType = (t) => this.setState({type: t });


//   setLanguage = () => {
//     localization.setLanguage(new URLSearchParams(this.props.location.search).get('lang') || 'en');
//     this.setState({});
//  }


  render() {

    const {person} = this.props;
    const {date, duration} = this.state;

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
        text: 'Customer Service'
      },
      { key: 5,
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
              <p>Role: {person.role}</p>
              <p>Contract: {person.contract}</p>
              <p>StoreID: 1</p>

              <DatePicker  value={date}
              label="Date" 
              disableAutoFocus={true}
              onSelectDate={this.updateDate} />
            
             <TextField label="Duration" defaultValue="1 hour" onChanged={this.updateDuration}/>

             <Dropdown
                  label='Type'
                  options={otTypes}
                  defaultSelectedKey={1}
                  onChanged={this.updateOtType}
                />

        
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