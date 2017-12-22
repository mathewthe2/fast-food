import React from 'react';
import client from '../../Client';

import {DetailsList} from 'office-ui-fabric-react/lib/DetailsList';

//locale
import localization from '../../locale/common';


class OtTypes extends React.Component {
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
        type: 'Cleaning',
        initialPay: '$200',
        hourlyPay: '-',
      },
      {
        id: 2,
        type: 'Cashier',
        initialPay: '$100',
        hourlyPay: '-',
      },
      {
        id: 3,
        type: 'Transportating goods',
        initialPay: '$300',
        hourlyPay: '-',
      },
      {
        id: 4,
        type: 'Kitchen maintenance',
        initialPay: '-',
        hourlyPay: '$80',
      }
    ]
    let _columns = [
      {
        key: 'type',
        name: 'Type',
        fieldName: 'type',
        minWidth: 50,
        maxWidth: 150,
      },
      {
        key: 'initialPay',
        name: 'Initial Pay',
        fieldName: 'initialPay',
        minWidth: 50,
        maxWidth: 150,
      },
      {
        key: 'hourlyPay',
        name: 'Hourly Pay',
        fieldName: 'hourlyPay',
        minWidth: 50,
        maxWidth: 150,
      },
    ];
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

export default OtTypes;