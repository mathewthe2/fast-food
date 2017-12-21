import React from 'react';
import client from '../../Client';

import {DetailsList} from 'office-ui-fabric-react/lib/DetailsList';

import moment from 'moment';
//locale
import localization from '../../locale/common';


class Overtime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      peaktypes: [],
      filtered_items: [],

    };
  }

  componentDidMount() {
    this.getOverTimeList();
    this.setLanguage();

  }

  getOverTimeList =() => {
    client.get('/peaktypes')
    .then(res => {
      const peaktypes = res.data;
      this.setState({ peaktypes });
      this.setState({ filtered_items: peaktypes});
    });
  }

  setLanguage = () => {
    localization.setLanguage(new URLSearchParams(this.props.location.search).get('lang') || 'en');
    this.setState({});
 }


  render() {
    // let _columns = [
    //   {
    //     key: 'firstName',
    //     name: localization.firstName,
    //     fieldName: 'firstName',
    //     minWidth: 50,
    //     maxWidth: 150,
    //   },
    //   {
    //     key: 'column2',
    //     name: localization.lastName,
    //     fieldName: 'lastName',
    //     minWidth: 50,
    //     maxWidth: 150,
    //   },
    //   {
    //     key: 'column3',
    //     name: 'Date',
    //     fieldName: 'date',
    //     minWidth: 100,
    //     maxWidth: 150,
    //   },
    //   {
    //     key: 'column44',
    //     name: 'Duration',
    //     fieldName: 'duration',
    //     minWidth: 80,
    //     maxWidth: 100,
    //   },
    //   {
    //     key: 'column5',
    //     name: 'Type',
    //     fieldName: 'type',
    //     minWidth: 50,
    //     maxWidth: 150,
    //   },
    //   {
    //     key: 'column6',
    //     name: 'Status',
    //     fieldName: 'status',
    //     minWidth: 50,
    //     maxWidth: 150,
    //   },
    // ];
    return (
      <div>

         <DetailsList
          items={ this.state.filtered_items }
        />
        
      </div>
    );
  }
}

export default Overtime;