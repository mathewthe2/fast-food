import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

//Office Fabric Components
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

//Components
import Store from './components/Store';
import PersonList from './components/Persons';
import PersonDetail from './components/Persons/detail';
import MyOvertime from './components/Persons/overtime';
import Shifts from './components/Shifts';
// import ShiftPlan from './components/Shifts/Plan';
import Overtime from './components/Overtime';
import OvertimeReview from './components/Overtime/review';
import PeakTypes from './components/Rules/peaktypes';
import OvertimeTypes from './components/Rules/ottypes';
import SufficiencyTypes from './components/Rules/sufficiencytypes';
// import AddShiftForm from './components/Shifts/Plan/addShiftForm';


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
            name: localization.rules,
            items: [
              {
                key: 'peak-types',
                name: 'Peak Types',
                onClick: () => history.push(`/peaktypes?lang=${lang}`),
              },
              {
                key: 'ot-types',
                name: 'Overtime Types',
                onClick: () => history.push(`/ottypes?lang=${lang}`),
              },
              {
                key: 'suff-types',
                name: 'Sufficiency Types',
                onClick: () => history.push(`/sufficiencytypes?lang=${lang}`),
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
            // items: [
            //   {
            //     key: 'add-shift',
            //     name: 'Add Shit',
            //     onClick: () => history.push(`/addshift?lang=${lang}`),
            //   },
            // ]
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
      <Route path="/myovertime/:personId/" component={MyOvertime}/>
      <Route path="/stores" component={Store}/>
      <Route path="/shifts" component={Shifts}/>
      {/* <Route path="/addshift" component={AddShiftForm}/> */}
      <Route path="/overtime" component={Overtime}/>
      <Route path="/overtimereview/:overtimeId" component={OvertimeReview}/>
      <Route path="/peaktypes" component={PeakTypes}/>
      <Route path="/ottypes" component={OvertimeTypes}/>
      <Route path="/sufficiencytypes" component={SufficiencyTypes}/>
      

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
          <h1 className="App-title">{localization.title}</h1>
        </header>
        <Menu/>
      </div>
    );
  }
}

export default App;
