import { SHOW_SUCCESS_BOX, HIDE_SUCCESS_BOX } from '../../actions/app/types';

const initialState = {
  isVisible: false,
  msg: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_SUCCESS_BOX:
      const newState = {
        isVisible: true,
        msg: action.payload.msg,
      };
      return newState;
      case HIDE_SUCCESS_BOX:
      return initialState;
    default:
      return initialState;
  }
}
