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


class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        page: 'store',
      }

    }
  
  
      render() {
        
        const {page} = this.state;

        return (
          <div className="App">
            <header className="App-header">
               {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <h1 className="App-title">Fast Food Restaurant Roster System</h1>
            </header>
            {/* <p className="App-intro">
              Fast Food Restaurant Roster System
            </p> */}
            <CommandBar
                items={[
                  {
                    key: 'my-store',
                    name: 'My Store',
                    ariaLabel: 'Choose a component example to render in the page',
                    onClick: () => { this.setState({ page: 'store' }) },
                    items: [
                      {
                        key: 'persons-list',
                        name: 'Staff List',
                        onClick: () => { this.setState({ page: 'persons-list' }) }
                      },
                    ]
                  } ,
                  {
                    key: 'shifts',
                    name: 'Shifts',
                    ariaLabel: 'Choose a component example to render in the page',
                    onClick: () => { this.setState({ page: 'shifts' }) },
                    items: [
                      {
                        key: 'shift-plan',
                        name: 'Shift Planning',
                        onClick: () => { this.setState({ page: 'shift-plan' }) }
                      },
                    ]
                  } ,
                  // {
                  //   key: 'component-example-menu',
                  //   name: 'Menu',
                  //   //disabled: !this.state.isAuthenticated,
                  //   ariaLabel: 'Choose a component example to render in the page',
                  //   items: [
                  //     {
                  //       key: 'persons-list',
                  //       name: 'Staff List',
                  //       onClick: () => { this.setState({ page: 'persons-list' }) }
                  //     },
                  //     {
                  //       key: 'details-list-example',
                  //       name: 'Store List',
                  //       onClick: () => { this.setState({ page: 'details-list-example' }) }
                  //     }
                  //   ]
                  // }  
                ]}
                />
               < div>
              {
                page === 'persons-list' &&
                <People/>
              }
              {
                page === 'store' &&
                <Store />
              }
              {
                page === 'shifts' &&
                <Shifts />
              }
              {
                page === 'shift-plan' &&
                <ShiftPlan />
              }
              </div>

          </div>
        );

   
    }
}

export default App;
