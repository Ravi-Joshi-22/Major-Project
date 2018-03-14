import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IconButton } from 'material-ui';
import ExpModal from '../userProfile/modalOpening/expmodal';
import EditIcon from 'material-ui/svg-icons/image/edit';

class Experience extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-11">
              <CardTitle title="Experience" />
            </div>
            <div className="column is-1">
              <ExpModal />
            </div>
          </div>

          <div className="columns">
            <div className="column is-6">
              <Card style={{ padding: 5, margin: 5 }}>
                <CardActions>
                  <IconButton className="icon" tooltip="Edit">
                    <EditIcon />
                  </IconButton>
                </CardActions>
                <CardHeader
                  title="Tata Consultancy Services"
                  subtitle="Software Developer"
                  avatar="/Assets/tcs.png"
                />
                <CardText style={{ padding: 2 }}>
                  Banglore<br />
                  2018-2019<br />
                  Worked on react.js<br />
                </CardText>
              </Card>
            </div>
            <div className="column is-6">
              <Card style={{ padding: 5, margin: 5 }}>
                <CardActions>
                  <IconButton className="icon" tooltip="Edit">
                    <EditIcon />
                  </IconButton>
                </CardActions>
                <CardHeader
                  title="Zensar Technology"
                  subtitle=" Trainee"
                  avatar="/Assets/zensar.png"
                />
                <CardText style={{ padding: 2 }}>
                  Pune <br />
                  2015-2016<br />
                  Based on Java And Oracle<br />
                </CardText>
              </Card>
            </div>
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Experience;
