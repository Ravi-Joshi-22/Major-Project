import { FINISH, START } from "../../actions/interview/types";

const initialState = 'pre';

export default function(state = null, action) {
  switch (action.type) {
    case FINISH:
      return action.payload;
    default:
      return initialState;
  }
}
