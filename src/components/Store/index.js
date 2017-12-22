import React from 'react';
import client from '../../Client';

//locale
import localization from '../../locale/common';

class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      store : {},
    };
  }

  componentDidMount() {

    client.get(`/stores/1`)
      .then(res => {
        const store = res.data;
        this.setState({ store });
        //console.log(this.state.store);
      });

      this.setLanguage();
  }

  setLanguage = () => {
    localization.setLanguage(new URLSearchParams(this.props.location.search).get('lang') || 'en');
    this.setState({});
 }

  render() {
    const {storeId, name, address, regularStaffDemand} = this.state.store;

    return (
      <div>
         <p>{localization.storeId} :{storeId}</p>
         <p>{localization.storeName} :{name}</p>
         <p>{localization.storeAddress}: {address}</p>
         <p>{localization.regularStaffDemand} :{regularStaffDemand}</p>
      </div>
    );
  }
}

export default Store;