import React from 'react';
import client from '../../Client';


class Overtime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      hello: '',

    };
  }

  componentDidMount() {

      client.get(`/helloworld`)
      .then(res => {
       // console.log("res", res.data);
        const hello = res.data;
        this.setState({ hello });
      });

      
  }

  render() {
    return (
      <div>
         <p>{this.state.hello}</p>
        
      </div>
    );
  }
}

export default Overtime;