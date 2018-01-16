import { LOGIN } from '../../actions/app/types';

export default function (state = null, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload || false;
    default:
      return state;
  }
}
