import React from 'react';
import client from '../../Client';

import {
  Persona,
  PersonaSize,
  // PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

import OvertimeForm from '../Overtime/form';
//locale
import localization from '../../locale/common';

class PersonDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        firstName: '',
        lastName: '',
        role: '',
        contract: '',
        address: '',
        city: '',
        experience: '',
      },
      openOverTimeForm: false,
    };
    
  }

  

  componentDidMount() {

      const {personId} = this.props.match.params;
      this.getPerson(personId);
      this.setLanguage();
  }

  setLanguage = () => {
    localization.setLanguage(new URLSearchParams(this.props.location.search).get('lang') || 'en');
    this.setState({});
 }

  getPerson = (id) => {
    client.get(`/person/${id}`)
    .then(res => {
      const person = res.data;
      this.setState({ person });
    });
  }

  redirectToOtApplications = (personId) => {
    this.props.history.push(`/myovertime/${personId}?lang=${localization.getLanguage()}`)
  }

  openOverTimeForm = () => this.setState({openOverTimeForm: true })
  closeOverTimeForm = () => this.setState({openOverTimeForm: false })


  render() {

    const {person} = this.state;
    
    const PersonaInfo= {
      primaryText: `${person.firstName} ${person.lastName}`,
      imageInitials: `${person.firstName[0]}${person.lastName[0]}`,
      secondaryText: person.role,
      tertiaryText: person.contract,
      optionalText: 'Available at 4:00pm'
    };

    return (
      <div style={{marginTop: 20, marginLeft: 20}} >
        <div>
         <Persona
          { ...PersonaInfo  }
          size={ PersonaSize.size72 }
          initialsColor={ Math.floor(Math.random() * 15)}
        />
        </div>
        <div style={{textAlign: 'left'}}> 
          <p >Address: {person.address}</p>
          <p >City: {person.city}</p>
          <p >Exp (years): {person.experience}</p>

            <PrimaryButton onClick={ this.openOverTimeForm.bind(this) } text='Overtime Application' />
            <DefaultButton  onClick={()=> this.redirectToOtApplications(person.id) } text='My OT Applications' />

            <OvertimeForm 
              person={person}
              valueLink={{            
              value: this.state.openOverTimeForm,
              requestChange: this.closeOverTimeForm.bind(this),
              // submitForm: this.handleSubmit.bind(this), 
              }}

            
            />



        </div>


        
      </div>
    );
  }
}

export default PersonDetail;