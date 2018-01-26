import React from 'react';
import ReactDOM from 'react-dom';

import InterviewOpening from '../../components/companyDashboard/InterviewOpening';

class Opening extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <InterviewOpening/>
      </div>
    );
  }
}

function mapStateToProps({ currentStep }) {
  return { currentStep };
}
export default Opening;