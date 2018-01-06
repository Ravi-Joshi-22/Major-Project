import { combineReducers } from 'redux';
import testReducers from './testReducers';

export default combineReducers({
  test: testReducers,
});
