import React from 'react';
import client from '../../Client';

import {DetailsList} from 'office-ui-fabric-react/lib/DetailsList';

//locale
import localization from '../../locale/common';


class SufficiencyTypes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {

    this.setLanguage();

  }

  setLanguage = () => {
    localization.setLanguage(new URLSearchParams(this.props.location.search).get('lang') || 'en');
    this.setState({});
 }


  render() {
    let _items = [
      {
        id: 1,
        range: '0 - 40%',
        description:  'Extremely Lacking',
      },
      {
        id: 2,
        range: '41 - 70%',
        description:  'Lacking',
      },
      {
        id: 3,
        range: '71% - 120%',
        description:  'Normal',
      },
      {
        id: 4,
        range: '121% - 140%',
        description:  'Plenty',
      },
      {
        id: 5,
        range: '141%+',
        description:  'Oversupply',
      }
    ];
    let _columns =[
      {
        key: 'range',
        name: 'Range',
        fieldName: 'range',
        minWidth: 50,
        maxWidth: 100,
      },
      {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        minWidth: 50,
        maxWidth: 100,
      },
  ]
    return (
      <div>

         <DetailsList
          items={ _items }
          columns={_columns}
        />
        
      </div>
    );
  }
}

export default SufficiencyTypes;