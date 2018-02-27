import React from 'react';
import Chip from 'material-ui/Chip';

export default class SkillChip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chipData: [
        { key: 0, label: 'JavaScript' },
        { key: 1, label: 'JQuery' },
        { key: 2, label: 'Android' },
        { key: 3, label: 'ReactJS' },
        { key: 4, label: 'Redux' },
        { key: 5, label: 'NodeJS' },
        { key: 6, label: 'C/C++' },
        { key: 7, label: 'Java' },
        { key: 8, label: 'Angular' },
        { key: 8, label: 'HTML' },
        { key: 8, label: 'CSS' },
        { key: 8, label: 'MYSQL' },
      ],
    };
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

  handleRequestDelete = key => {
    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map(chip => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.setState({ chipData: this.chipData });
  };

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
    return (
      <div style={this.styles.wrapper}>
        {this.state.chipData.map(this.renderChip, this)}
      </div>
    );
  }
}
