import React from 'react';
import client from '../../Client';
import moment from 'moment';

import {
  Persona,
  PersonaSize,
  // PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {DetailsList} from 'office-ui-fabric-react/lib/DetailsList';

import OvertimeForm from '../Overtime/form';
//locale
import localization from '../../locale/common';

class MyOvertime extends React.Component {
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
      overtime: [],
      filtered_items: [],
    };
    
  }

  

  componentDidMount() {

      const {personId} = this.props.match.params;
      this.getPerson(personId);
      this.getOverTimeList(personId);
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

  getOverTimeList =(personId) => {
    client.get(`/overtime_by_person/${personId}`)
    .then(res => {
      const overtime = this.parseOvertime(res.data);
      this.setState({ overtime });
      this.setState({ filtered_items: overtime});
    });
  }

  parseOvertime = (ot) => ot.map((item) => {
    item.date = moment(item.date).format('YYYY-MM-DD hh:mm a');
    return item
  });

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
    let _columns = [
      {
        key: 'firstName',
        name: localization.firstName,
        fieldName: 'firstName',
        minWidth: 50,
        maxWidth: 150,
      },
      {
        key: 'column2',
        name: localization.lastName,
        fieldName: 'lastName',
        minWidth: 50,
        maxWidth: 150,
      },
      {
        key: 'column3',
        name: 'Date',
        fieldName: 'date',
        minWidth: 100,
        maxWidth: 150,
      },
      {
        key: 'column44',
        name: 'Duration',
        fieldName: 'duration',
        minWidth: 80,
        maxWidth: 100,
      },
      {
        key: 'column5',
        name: 'Type',
        fieldName: 'type',
        minWidth: 50,
        maxWidth: 150,
      },
      {
        key: 'column6',
        name: 'Status',
        fieldName: 'status',
        minWidth: 100,
        maxWidth: 150,
      },
    ];

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


            <DetailsList
          items={ this.state.filtered_items }
          columns={_columns}
        />

            <DefaultButton
            primary={ true }
            text='Overtime Application'
            onClick={ this.openOverTimeForm.bind(this) }
            />

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

export default MyOvertime;