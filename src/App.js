import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

//Office Fabric Components
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

//Components
import Store from './components/Store';
import PersonList from './components/Persons';
import PersonDetail from './components/Persons/detail';
import Shifts from './components/Shifts';
import ShiftPlan from './components/Shifts/Plan';
import Overtime from './components/Overtime';
import PeakTypes from './components/Rules/peaktypes';

//locale
import localization from './locale/common';

import { HashRouter as Router, Route } from 'react-router-dom';
import {updateQueryStringParameter, getUrlParameter } from './styles/Utils';

var lang = getUrlParameter('lang') || 'en';

const changeLanguage = (l) => {
  lang = l; 
  window.location = updateQueryStringParameter(window.location.href, 'lang', lang);;
  window.location.reload();
}

const Menu = (props) => (
  <Router>
    <div>
      <Route render={({ history}) => (
        <CommandBar
        farItems = {[
          {
            key: 'rules',
            name:  'Business Rules',
            items: [
              {
                key: 'peak-types',
                name: 'Peak Types',
                onClick: () => history.push(`/peaktypes?lang=${lang}`),
              },
            ]
          } ,
          {
            key: 'lang-controller',
            name: 'Language',
            items: [
              {
                key: 'en',
                name: 'English',
              onClick: ()  => changeLanguage('en'),
              },
              {
                key: 'ch',
                name: '中文',
              onClick: ()  => changeLanguage('ch'),
              },
              {
                key: 'ja',
                name: '日本語',
              onClick: ()  => changeLanguage('ja'),
              },
            ]
          } 
        ]}
        items={[
          {
            key: 'my-store',
            name: localization.myStore,
            ariaLabel: 'Store Info',
            onClick: () => history.push(`/stores?lang=${lang}`),
            items: [
              {
                key: 'persons-list',
                name: localization.staffList,
              onClick: ()  => history.push(`/personlist?lang=${lang}`),
              },
            ]
          } ,
          {
            key: 'shifts',
            name: localization.shifts,
            onClick: ()  => history.push(`/shifts?lang=${lang}`),
            items: [
              {
                key: 'shift-plan',
                name: 'Shift Planning',
                onClick: () => history.push(`/shiftplan?lang=${lang}`),
              },
            ]
          } ,
          {
            key: 'overtime',
            name:  localization.overtime,
            ariaLabel: 'overtime application',
            onClick: () => history.push(`/overtime?lang=${lang}`),
          }
        ]}
        />
      )} />
      <Route path="/personlist" component={PersonList}/>
      <Route path="/person/:personId" component={PersonDetail}/>
      <Route path="/stores" component={Store}/>
      <Route path="/shifts" component={Shifts}/>
      <Route path="/shiftplan" component={ShiftPlan}/>
      <Route path="/overtime" component={Overtime}/>
      <Route path="/peaktypes" component={PeakTypes}/>
      

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
        <Menu/>
      </div>
    );
  }
}

export default App;
