import React from 'react';
import client from '../../Client';

import {DetailsList} from 'office-ui-fabric-react/lib/DetailsList';

//locale
import localization from '../../locale/common';


class PeakTypes extends React.Component {
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
    let _columns = [
      {
        key: 'type',
        name: 'Type',
        fieldName: 'type',
        minWidth: 50,
        maxWidth: 150,
      },
      {
        key: 'demand',
        name: 'Demand',
        fieldName: 'demand',
        minWidth: 50,
        maxWidth: 150,
      }
    ];
    return (
      <div>

         <DetailsList
          items={ this.state.filtered_items }
          columns={_columns}
        />
        
      </div>
    );
  }
}

export default PeakTypes;