import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IconButton } from 'material-ui';
import EduModal from '../userProfile/modalOpening/eduModal';
import EditIcon from 'material-ui/svg-icons/image/edit';

class Education extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-11">
              <CardTitle title="Education" />
              <CardHeader
                title="Medicaps Institute Of Technology and Management"
                subtitle="Bachelor Of Enginnering"
                avatar="/Assets/educ.jpg"
              />
              <CardActions>
                <IconButton className="icon" tooltip="Edit">
                  <EditIcon />
                </IconButton>
              </CardActions>
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
              <CardActions>
                <IconButton className="icon" tooltip="Edit">
                  <EditIcon />
                </IconButton>
              </CardActions>
              <CardText style={{ padding: 2 }}>
                Science<br />
                2012-2014<br />
                Percentage:90%<br />
              </CardText>
            </div>
            <div className="column is-1">
              <EduModal />
            </div>
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Education;
