import {
  FETCH_ELLIGIBLE_OPENING,
  FETCH_APPLIED_OPENING
} from "../../actions/interviewee/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_ELLIGIBLE_OPENING:
      return action.payload || false;
    case FETCH_APPLIED_OPENING:
      return action.payload || false;
    default:
      return state;
  }
}
