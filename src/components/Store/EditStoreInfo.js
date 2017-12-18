import React from 'react';
import axios from 'axios';

import {DEFAULT_API_SERVER_URL} from '../../Config';

class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      store : {},
    };
  }

  componentDidMount() {
    // axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
    //   .then(res => {
    //     const posts = res.data.data.children.map(obj => obj.data);
    //     this.setState({ posts });
    //   });

    var instance = axios.create({
      baseURL: DEFAULT_API_SERVER_URL,
      timeout: 1000,
      // headers: {'X-Custom-Header': 'foobar'}
    });

    instance.get(`/stores/1`)
      .then(res => {
        const store = res.data[0];
        this.setState({ store });
        console.log(this.state.store);
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