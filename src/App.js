import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

//Office Fabric Components
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

//Components
import Store from './components/Store';
import People from './components/Persons';
import Shifts from './components/Shifts';
import ShiftPlan from './components/Shifts/Plan';

import { HashRouter as Router, Route } from 'react-router-dom'

const Menu = (
  <Router>
    <div>
      <Route render={({ history}) => (
        <CommandBar
        items={[
          {
            key: 'my-store',
            name: 'My Store',
            ariaLabel: 'Choose a component example to render in the page',
            onClick: () => { history.push('/stores') },
            items: [
              {
                key: 'persons-list',
                name: 'Staff List',
              onClick: ()  => { history.push('/people') },
              },
            ]
          } ,
          {
            key: 'shifts',
            name: 'Shifts',
            ariaLabel: 'Choose a component example to render in the page',
            onClick: ()  => { history.push('/shifts') },
            items: [
              {
                key: 'shift-plan',
                name: 'Shift Planning',
                onClick: () => { history.push('/shiftplan') },
              },
            ]
          } ,
        ]}
        />
      )} />
      <Route path="/people" component={People}/>
      <Route path="/stores" component={Store}/>
      <Route path="/shifts" component={Shifts}/>
      <Route path="/shiftplan" component={ShiftPlan}/>
    </div>
  </Router>
)


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fast Food Restaurant Roster System</h1>
        </header>
        {Menu}
      </div>
    );
  }
}

export default App;
