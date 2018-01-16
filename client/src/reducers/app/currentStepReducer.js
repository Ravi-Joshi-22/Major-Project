import { CUREENT_STEP } from '../../actions/app/types';

export default function (state = 0, action) {
  switch (action.type) {
    case CUREENT_STEP:
      return action.payload || false;
    default:
      return state;
  }
}
