import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/editor/mode-edit';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { IconButton } from 'material-ui';
const iconStyles = {
  marginRight: 10,
  marginTop: 5,
};
class Education extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-10">
              <CardTitle title="Education" />
              <CardHeader
                title="Medicaps Institute Of Technology and Management"
                subtitle="Bachelor Of Enginnering"
                avatar="/Assets/educ.jpg"
              />
              <CardText style={{ padding: 2 }}>
                Computer Science and Enginnering<br />
                2014-2018<br />
                CGPA:8.00/10<br />
              </CardText>
              <hr />
              <CardHeader
                title="Chameli Devi School"
                subtitle="Senior Secondary"
                avatar="/Assets/sec.jpg"
              />
              <CardText style={{ padding: 2 }}>
                Science<br />
                2012-2014<br />
                Percentage:90%<br />
              </CardText>
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
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Education;
