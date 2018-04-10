import { STORE_TRACK_ID } from '../../actions/app/types';

export default function(state = '', action) {
  switch (action.type) {
    case STORE_TRACK_ID:
      return action.payload;
    default:
      return null;
  }
}
