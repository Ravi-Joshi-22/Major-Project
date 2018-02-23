import { ERROR, CLEAR_ERROR } from '../../actions/app/types';

const initialState = {
  isError: false,
  error: {},
};

export default function(state = null, action) {
  switch (action.type) {
    case ERROR:
      const newState = {
        isError: true,
        error: action.payload.msg,
      };
      return newState;
    case CLEAR_ERROR:
      return initialState;
    default:
      return initialState;
  }
}
