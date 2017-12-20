import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

//Office Fabric Components
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';


//Components
import Store from './components/Store';
import People from './components/Persons';
import Shifts from './components/Shifts';
import ShiftPlan from './components/Shifts/Plan';
import Overtime from './components/Overtime';

//locale
import localization from './locale/common';

import { HashRouter as Router, Route } from 'react-router-dom';
import {updateQueryStringParameter, getUrlParameter } from './styles/Utils';

var lang = getUrlParameter('lang') || 'en';

const Languages = (
    <Dropdown
      label='Language'
      placeHolder='English'
      options={[
        { key: 'en', text: 'English' },
        { key: 'ch', text: '中文' },
        { key: 'ja', text: '日本語' },
      ]}
      defaultSelectedKey={getUrlParameter('lang') || 'en'}
      min={1}
      onChanged={(l)=> {
        lang = l.key; 
       window.location = updateQueryStringParameter(window.location.href, 'lang', lang);;
       window.location.reload();
      }}
  />
)

const Menu = (props) => (
  <Router>
    <div>
      <Route render={({ history}) => (
        <CommandBar
        items={[
          {
            key: 'my-store',
            name: localization.myStore,
            ariaLabel: 'Store Info',
            onClick: () => { history.push(`/stores?lang=${lang}`) },
            items: [
              {
                key: 'persons-list',
                name: localization.staffList,
              onClick: ()  => { history.push(`/people?lang=${lang}`) },
              },
            ]
          } ,
          {
            key: 'shifts',
            name: localization.shifts,
            onClick: ()  => { history.push(`/shifts?lang=${lang}`) },
            items: [
              {
                key: 'shift-plan',
                name: 'Shift Planning',
                onClick: () => { history.push(`/shiftplan?lang=${lang}`) },
              },
            ]
          } ,
          {
            key: 'overtime',
            name: 'Overtime',
            ariaLabel: 'overtime application',
            onClick: () => { history.push(`/overtime?lang=${lang}`) },
          } 
        ]}
        />
      )} />
      <Route path="/people" component={People}/>
      <Route path="/stores" component={Store}/>
      <Route path="/shifts" component={Shifts}/>
      <Route path="/shiftplan" component={ShiftPlan}/>
      <Route path="/overtime" component={Overtime}/>
      

    </div>
  </Router>
)


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setLanguage();
  }
    
  setLanguage = () => {
    localization.setLanguage(getUrlParameter('lang') || 'en');
    this.setState({});
   }

  render() {

    

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fast Food Restaurant Roster System</h1>
        </header>
        {Languages}
        <Menu/>
      </div>
    );
  }
}

export default App;
