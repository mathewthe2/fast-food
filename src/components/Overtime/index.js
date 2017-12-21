import React from 'react';
import client from '../../Client';

import {DetailsList} from 'office-ui-fabric-react/lib/DetailsList';

//locale
import localization from '../../locale/common';


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
    this.setLanguage();

  }

  getOverTimeList =() => {
    client.get('/overtime')
    .then(res => {
      const overtime = res.data;
      this.setState({ overtime });
      this.setState({ filtered_items: overtime});
    });
  }

  setLanguage = () => {
    localization.setLanguage(new URLSearchParams(this.props.location.search).get('lang') || 'en');
    this.setState({});
 }

  // onSearch = (keyword) => {
  //   if (keyword === '') {
  //     this.setState({ filtered_items: this.state.persons});
  //   }

  //   let filtered_items = this.state.persons.filter((person) => {
  //     const firstName = person.firstName.toLowerCase();
  //     const lastName = person.lastName.toLowerCase();
  //     const  k = keyword.toLowerCase();
  //     return (firstName.includes(k) || lastName.includes(k))
  //   })

  //   this.setState({ filtered_items});
  // }

  render() {
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
        name: 'date',
        fieldName: 'date',
        minWidth: 100,
        maxWidth: 150,
      },
      {
        key: 'column44',
        name: 'duration',
        fieldName: 'duration',
        minWidth: 80,
        maxWidth: 100,
      },
      {
        key: 'column5',
        name: 'type',
        fieldName: 'type',
        minWidth: 50,
        maxWidth: 150,
      },
      {
        key: 'column6',
        name: 'status',
        fieldName: 'status',
        minWidth: 50,
        maxWidth: 150,
      },
    ];
    return (
      <div>
         <p>{this.state.hello}</p>

         <DetailsList
          items={ this.state.filtered_items }
          columns={_columns}
        />
        
      </div>
    );
  }
}

export default Overtime;