import React from 'react';
import client from '../../Client';

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
        const store = res.data[0];
        this.setState({ store });
        //console.log(this.state.store);
      });
      
  }

  render() {
    const {storeId, name, address, regularStaffDemand} = this.state.store;

    return (
      <div>
         <p>Store ID: {storeId}</p>
         <p>Name: {name}</p>
         <p>Address: {address}</p>
         <p>Regular Staff in Demand: {regularStaffDemand}</p>
      </div>
    );
  }
}

export default Store;