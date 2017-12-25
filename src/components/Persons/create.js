import React from 'react';
import client from '../../Client';

// import {
//   Persona,
//   PersonaSize,
//   // PersonaInitialsColor,
// } from 'office-ui-fabric-react/lib/Persona';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

//locale
import localization from '../../locale/common';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

class PersonCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // person: {
      //   firstName: '',
      //   lastName: '',
      //   role: '',
      //   contract: '',
      //   address: '',
      //   city: '',
      //   experience: '',
      // },
      firstName: '',
      lastName: '',
      role: '',
      contract: 'Full Time',
      address: '',
      city: '',
      experience: '',
    };
    
  }

  

  componentDidMount() {

      // const {personId} = this.props.match.params;
      // this.getPerson(personId);
      this.setLanguage();
  }

  setLanguage = () => {
    localization.setLanguage(new URLSearchParams(this.props.location.search).get('lang') || 'en');
    this.setState({});
 }

 addEmployee = () => {

  const {firstName, lastName, role, contract, address, experience, city} = this.state;

  var params = new URLSearchParams();
  params.append('firstName', firstName);
  params.append('lastName', lastName);
  params.append('role', role);
  params.append('contract', contract);
  params.append('address', address);
  params.append('experience', experience);
  params.append('city', city);

  client.post(`/addperson?${params.toString()}`)
  .then(()=> {
  // callback();
  alert('Added staff.');
  });
  
 }

 clearForm = () => this.setState ({
  firstName: '',
  lastName: '',
  role: '',
  contract: '',
  address: '',
  city: '',
  experience: '',
 })

  // redirectToOtApplications = (personId) => {
  //   this.props.history.push(`/myovertime/${personId}?lang=${localization.getLanguage()}`)
  // }

  // openOverTimeForm = () => this.setState({openOverTimeForm: true })
  // closeOverTimeForm = () => this.setState({openOverTimeForm: false })

  updateFirstName = (firstName) => this.setState({ firstName });
  updateLastName = (lastName) => this.setState({ lastName });
  updateRole = (role) => this.setState({ role });
  upadteContract = (c) => this.setState({contract: c.text});
  updateExperience = (experience) => this.setState ({ experience});
  updateCity = (city) => this.setState({ city});
  updateAddress = (address) => this.setState({ address});

  render() {

    // const {person} = this.state;
    
    // const PersonaInfo= {
    //   primaryText: `${person.firstName} ${person.lastName}`,
    //   imageInitials: `${person.firstName[0]}${person.lastName[0]}`,
    //   secondaryText: person.role,
    //   tertiaryText: person.contract,
    //   optionalText: 'Available at 4:00pm'
    // };

    return (

      <div style={{marginTop: 20, marginLeft: 20, width: '50vh', }} >

      <form>
                
        <TextField label="First Name" value={this.state.firstName} onChanged={this.updateFirstName}/>
        <TextField label="Last Name"value={this.state.lastName}  onChanged={this.updateLastName}/>
        <TextField label="Role " value={this.state.role} onChanged={this.updateRole}/>
        <Dropdown
                  label='Contract'
                  options={    
                    [
                      {key: 1, 
                      text: "Full Time"},
                    {key: 2, 
                      text: "Part Time"}
                    ]      
                    }
                  defaultSelectedKey={1}
                  min={1}
                  onChanged={this.upadteContract}
                />
        <TextField label="Address" value={this.state.address} onChanged={this.updateAddress}/>
        <TextField label="City"value={this.state.city}  onChanged={this.updateCity}/>
        <TextField label="Experience" value={this.state.experience} onChanged={this.updateExperience}/>

        <div style={{marginTop: 20}} >
          <PrimaryButton onClick={()=> this.addEmployee() } text='Save' />
          <DefaultButton  onClick={()=> this.clearForm() } text='Clear' />
        </div>

        </form>

        
      </div>
    );
  }
}

export default PersonCreate;