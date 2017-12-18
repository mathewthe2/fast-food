import React from 'react';

import ShiftPlanForm from './form';


class ShiftPlan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // persons: [],
      // shifts: [],
      // manHours: [],
      // peakHours: [],
    };
  }

  componentDidMount() {

  }

  render() {

    
    return (
      <div>
        <ShiftPlanForm />

    </div>
    );
  }
}

export default ShiftPlan;