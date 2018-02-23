import React from 'react';

export default class LoadingBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-content">
          <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px' }} />
        </div>
      </div>
    );
  }
}
