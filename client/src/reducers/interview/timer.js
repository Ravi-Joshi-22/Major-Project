import { RESET_TIMER } from "../../actions/interview/types";

const initialState = 120;

export default function(state = null, action) {
  switch (action.type) {
    case RESET_TIMER:
      return action.payload;
    default:
      return initialState;
  }
}
