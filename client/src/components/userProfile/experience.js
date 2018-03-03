import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/editor/mode-edit';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { IconButton } from 'material-ui';
import style from 'material-ui/svg-icons/image/style';
const iconStyles = {
  marginRight: 10,
  marginTop: 5,
};

class Experience extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-10">
              <CardTitle title="Experience" />
            </div>
            <div className="column is-2">
              <IconButton tooltip="Edit">
                <AddIcon />
              </IconButton>
              <FloatingActionButton mini={true} style={iconStyles}>
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </div>

          <div className="columns">
            <div className="column is-6">
              <Card style={{ padding: 5, margin: 10 }}>
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
              <Card style={{ padding: 5, margin: 10 }}>
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
