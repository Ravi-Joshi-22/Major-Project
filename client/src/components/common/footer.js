import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
          <div className="col-sm-12 footer">
          <span>&copy;</span>COPYRIGHT SMARTHYRE PVT. LTD
          </div>
        <style jsx global>{`
          .footer {
            height: 100%;
            text-align: center;
            color: white;
            font-size: 1.5em;
            font-weight: bold;
            padding: 20px 20px;
            background-color: rgb(0,188,212);
          }
        `}</style>
      </MuiThemeProvider>
    );
  }
}

export default Footer;