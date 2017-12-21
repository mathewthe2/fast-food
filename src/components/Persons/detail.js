import React from 'react';
import client from '../../Client';

import {
  Persona,
  PersonaSize,
  PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';

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
      },
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



  render() {

    const {person} = this.state;
    
    const PersonaInfo= {
      primaryText: 'what',
      primaryText: `${person.firstName} ${person.lastName}`,
      imageInitials: `${person.firstName[0]}${person.lastName[0]}`,
      secondaryText: person.role,
      tertiaryText: person.contract,
      optionalText: 'Available at 4:00pm'
    };

    return (
      <div>
        <div style={{marginTop: 20, marginLeft: 20}} >
         <Persona
          { ...PersonaInfo  }
          size={ PersonaSize.size72 }
          initialsColor={ PersonaInitialsColor.lightBlue }
        />
        </div>

        
      </div>
    );
  }
}

export default PersonDetail;