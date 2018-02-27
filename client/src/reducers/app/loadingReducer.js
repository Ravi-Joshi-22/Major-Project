import { START_LOADING } from '../../actions/app/types';

const initialState = {
  isloading: false,
};

export default function(state = null, action) {
  switch (action.type) {
    case START_LOADING:
      const newState = {
        isloading: true,
      };
      return newState;
    default:
      return initialState;
  }
}
