import React from 'react';

export default class LoadingBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-content has-text-centered">
          <i
            class="fa fa-spinner fa-spin"
            style={{ fontSize: '30px', color: 'white' }}
          />
        </div>
      </div>
    );
  }
}
