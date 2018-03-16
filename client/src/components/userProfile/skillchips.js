import React from 'react';
import Chip from 'material-ui/Chip';

export default class SkillChip extends React.Component {
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

  handleRequestDelete = key => {};

  renderChip(data) {
    return (
      <Chip
        key={data._id}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.name}
      </Chip>
    );
  }

  render() {
    console.log(this.props.skillsArray);
    return (
      <div style={this.styles.wrapper}>
        {this.props.skillsArray.map(this.renderChip, this)}
      </div>
    );
  }
}
