import { FETCH_TEST_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_TEST_USER:
      return action.payload || false;
    default:
      return state;
  }
}
