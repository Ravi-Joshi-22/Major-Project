import React from 'react';
import Chip from 'material-ui/Chip';
import { connect } from 'react-redux';
import * as actions from '../../actions/interviewee/skills';

class SkillChip extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
  }

  handleRequestDelete = deleteId => {
    const requestObject = {
      skill: {
        _id: deleteId,
      },
    };
    this.props.deleteSkills(requestObject);
  };

  renderChip(data) {
    return (
      <Chip
        key={data._id}
        onRequestDelete={() => this.handleRequestDelete(data._id)}
        style={this.styles.chip}
      >
        {data.name}
      </Chip>
    );
  }

  render() {
    return (
      <div style={this.styles.wrapper}>
        {this.props.skillsArray.map(this.renderChip, this)}
      </div>
    );
  }
}

export default connect(null, actions)(SkillChip);
