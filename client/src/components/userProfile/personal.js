import React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EditIcon from 'material-ui/svg-icons/image/edit';
import { IconButton } from 'material-ui';
class Personal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ margin: 10, marginTop: 20 }}>
          <CardActions>
            <IconButton className="icon" tooltip="Edit">
              <EditIcon />
            </IconButton>
          </CardActions>
          <br />
          <div className="center">
            <CardTitle
              title="Shreya Jhunjhunwala"
              subtitle="shreyajhunjhunwala7@gmail.com"
            />

            <CardText>
              Student At Medicaps Instiute Of Technology And Management<br />
              Indore, Madhya Pradesh <br />
            </CardText>
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
