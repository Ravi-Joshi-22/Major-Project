import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ScoreCard from './scoreCard';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class GridView extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <GridList>
          {this.props.results.map(eachResult => (
            <ScoreCard resultInfo={eachResult} />
          ))}
        </GridList>
      </div>
    );
  }
}
export default GridView;
