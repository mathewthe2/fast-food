import React from 'react';
import client from '../../Client';

import {DetailsList} from 'office-ui-fabric-react/lib/DetailsList';


class Overtime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      hello: '',
      overtime: [],
      filtered_items: [],

    };
  }

  componentDidMount() {
    this.getOverTimeList();
    
  }

  getOverTimeList =() => {
    client.get('/overtime')
    .then(res => {
      const overtime = res.data;
      this.setState({ overtime });
      this.setState({ filtered_items: overtime});
    });
  }

  onSearch = (keyword) => {
    if (keyword === '') {
      this.setState({ filtered_items: this.state.persons});
    }

    let filtered_items = this.state.persons.filter((person) => {
      const firstName = person.firstName.toLowerCase();
      const lastName = person.lastName.toLowerCase();
      const  k = keyword.toLowerCase();
      return (firstName.includes(k) || lastName.includes(k))
    })

    this.setState({ filtered_items});
  }

  render() {
    return (
      <div>
         <p>{this.state.hello}</p>

         <DetailsList
          items={ this.state.filtered_items }
        />
        
      </div>
    );
  }
}

export default Overtime;