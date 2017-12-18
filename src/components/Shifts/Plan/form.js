import React from 'react';

import client from '../../../Client';

import moment from 'moment';

//ms components
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import Dialog from '../../../styles/Dialog';

class ShiftPlanForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      peakTypes: [],
      store: {},

      hidden: true,

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
  

  handleSubmit = (e) => {
    e.preventDefault();
  }

  

  render() {

    const {peakTypes, store} = this.state;

    const current_month = `${moment().get("year")}-${moment().get("month")+1}`;  

    
    return (

      <div>

      <button onClick={this.handleOpen}>Add Stuff</button>
    
      <Dialog
           buttonTitle = "Add Peak"
            title = "Add Peak"
            instruction = "Add peaks for this month."
            valueLink={{            
              value: this.state.hidden,
              requestChange: this.handleClose.bind(this)
          }}
                    >
          <form  onSubmit={this.handleSubmit}>

              <p>Month to Plan</p>

              <input type="month" defaultValue={current_month} />

              <Dropdown
                  className='Dropdown-example'
                  label='Peak Type'
                  placeHolder='Pick peak type'
                  options={peakTypes}
                />


                  <input id="time" type="time" defaultValue="13:30"/>

                          
                <input type="submit" value="Submit" /> 

                </form>
        </Dialog>

        </div>
    );
  }
  
}

export default ShiftPlanForm;