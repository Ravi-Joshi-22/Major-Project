import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CardHeader from 'material-ui/Card/CardHeader';
import ElligibleTable from './elligibleTable';
import { connect } from 'react-redux';
import * as actions from '../../../actions/interviewee';

class ElligibleOpenings extends React.Component {
  constructor(props) {
    super(props);

    this.renderTableContent = this.renderTableContent.bind(this);
    this.noOpeningContent = this.noOpeningContent.bind(this);
  }

  componentDidMount() {
    this.props.getElligibleOpenings();
  }

  renderTableContent() {
    const { intervieweeOpenings } = this.props;
    const renderOpeningContent = intervieweeOpenings.elligibleOpenings.map(
      (eachOpening, key) => (
        <Card style={{ padding: 5, margin: 20 }}>
          <CardHeader
            title={eachOpening.company_id.company_name}
            subtitle={eachOpening.position}
            avatar={eachOpening.company_id.company_logo}
          />
          <CardText style={{ padding: 2 }}>
            <ElligibleTable interviewData={eachOpening} />
          </CardText>
        </Card>
      )
    );
    return renderOpeningContent;
  }

  noOpeningContent() {
    return <p> No Openings Available</p>;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <div>
          {this.props.intervieweeOpenings
            ? this.renderTableContent()
            : this.noOpeningContent()}
        </div>
      </MuiThemeProvider>
    );
  }
}
function mapStateToProps({ intervieweeOpenings }) {
  return { intervieweeOpenings };
}
export default connect(mapStateToProps, actions)(ElligibleOpenings);
