import React from 'react';
import client from '../../Client';
import moment from 'moment';

import {
  Persona,
  PersonaSize,
} from 'office-ui-fabric-react/lib/Persona';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import {updateOvertimeStatus} from './updateOvertimeStatus';

//locale
import localization from '../../locale/common';

class OvertimeReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overtime: {
        firstName: '',
        lastName: '',
        date: '',
        duration: '',
        type: '',
        status: '',
        //approved_by :'',
      },
      managerName: 'Anonymous',
      
    
      // openOverTimeForm: false,
    };
    
  }

  

  componentDidMount() {

      const {overtimeId} = this.props.match.params;
      this.getOvertime(overtimeId);
      this.setLanguage();
  }

  setLanguage = () => {
    localization.setLanguage(new URLSearchParams(this.props.location.search).get('lang') || 'en');
    this.setState({});
 }

  getOvertime = (id) => {
    client.get(`/overtime/${id}`)
    .then(res => {
      const overtime = res.data;
      this.setState({ overtime });
    });
  }

  updateOvertimeStatus = (status) => {
    updateOvertimeStatus(this.state.overtime.id, status, ()=>{
      window.location.reload();
    })
  }

  updateManagerName = (t) => this.setState({managerName: t });

  redirectToPerson = (personId) => {
    this.props.history.push(`/person/${personId}?lang=${localization.getLanguage()}`)
  }


  render() {

    const {overtime, managerName} = this.state;
    
    const PersonaInfo= {
      primaryText: `${overtime.firstName} ${overtime.lastName}`,
      imageInitials: `${overtime.firstName[0]}${overtime.lastName[0]}`,
    };

    return (
      <div style={{marginTop: 20, marginLeft: 20}} >
        <h4 style={{textAlign: 'left', fontWeight: 'light'}}> Overtime Review </h4>
        <div  style={{cursor: 'pointer'}} 
              onClick={()=>this.redirectToPerson(overtime.employee)}>
         <Persona
          { ...PersonaInfo  }
          size={ PersonaSize.size48 }
          initialsColor={ Math.floor(Math.random() * 15)}
        />
        </div>
        <div style={{textAlign: 'left'}}> 
        <p >Date: {moment(overtime.date).format('YYYY-MM-DD hh:mm a')}</p>
        <p >Duration: {overtime.duration}</p>
        <p >Type: {overtime.type}</p>
        <p >Status: {overtime.status}</p>
          {/* <p >Address: {person.address}</p>
          <p >City: {person.city}</p>
          <p >Exp (years): {person.experience}</p> */}

            <TextField label="Manager"defaultValue={this.state.managerName} onChanged={this.updateManagerName}/>
            <div style={{marginTop: 20}} >
              <PrimaryButton onClick={()=> this.updateOvertimeStatus(`Approved by Manager ${managerName}`) } text='Accept' />
              <DefaultButton  onClick={()=> this.updateOvertimeStatus(`Declined`) } text='Decline' />
            </div>


        </div>


        
      </div>
    );
  }
}

export default OvertimeReview;