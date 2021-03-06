import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IconButton } from 'material-ui';
class Personal extends React.Component {
  constructor(props) {
    super(props);
    this.renderPersonal = this.renderPersonal.bind(this);
  }
  renderPersonal() {
    return (
      <div>
        <CardTitle
          title={
            this.props.personal.first_name + ' ' + this.props.personal.last_name
          }
          subtitle={this.props.personal.email}
        />

        <CardText>{this.props.personal.phone}</CardText>
      </div>
    );
  }

  render() {
    const { personal } = this.props;
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ margin: 10, marginTop: 17 }}>
          <br />
          <div className="center">
            {!personal ? "Add Personal details" : this.renderPersonal()}
          </div>
        </Card>

        <style jsx global>{`
          .circular {
            border-radius: 50%;
          }
          .center {
            text-align: center;
          }
          .icon {
            float: right;
          }
        `}</style>
      </MuiThemeProvider>
    );
  }
}
export default Personal;
