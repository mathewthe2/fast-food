import React from 'react';
import client from '../../Client';

//locale
import localization from '../../locale/common';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { locale } from 'moment';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.logout();

      this.setLanguage();
  }

  updatePassword = (password) => this.setState({ password});

  updateUsername = (username) => this.setState({ username});

  clearForm = () => this.setState({
    username: '',
    password: '',
  })

  logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem('authLevel');
    // window.location.reload();
  }

  login = () => {
    const {username, password} = this.state;

    var params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    client.get(`/login?${params.toString()}`)
    .then((res)=> {
      if (res.data.login == 'true') {
       localStorage.setItem('loggedIn', true)
       localStorage.setItem('authLevel', res.data.level)
       this.props.history.push(`/stores?lang=${localization.getLanguage()}`)
      } else {
        alert("Incorrect username or password.")
      }


    });


  }

  setLanguage = () => {
    localization.setLanguage(new URLSearchParams(this.props.location.search).get('lang') || 'en');
    this.setState({});
 }

  render() {
      const {username, password} = this.state;
    return (
      <div  style={{display: 'flex', justifyContent:'center' }} >

        <form>

          <TextField label="Username" value={username} onChanged={this.updateUsername} />
          <TextField label="Password" value={password} type="password" onChanged={this.updatePassword}  onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.login()
                }
              }} />

          <div style={{marginTop: 20}} >
          <PrimaryButton onClick={()=> this.login() } text='Login' />
          <DefaultButton  onClick={()=> this.clearForm() } text='Clear' />
        </div>


        </form>



         {/* <p>{localization.storeId} :{storeId}</p>
         <p>{localization.storeName} :{name}</p>
         <p>{localization.storeAddress}: {address}</p>
         <p>{localization.regularStaffDemand} :{regularStaffDemand}</p> */}
      </div>
    );
  }
}

export default Login;