import React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EditIcon from 'material-ui/svg-icons/image/edit';
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
        <Card style={{ margin: 10, marginTop: 20 }}>
          <CardActions>
            <IconButton className="icon" tooltip="Edit">
              <EditIcon />
            </IconButton>
          </CardActions>
          <br />
          <div className="center">
            {!personal ? null : this.renderPersonal()}
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
