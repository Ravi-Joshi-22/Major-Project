import {
  FETCH_ELLIGIBLE_OPENING,
  FETCH_APPLIED_OPENING
} from "../../actions/interviewee/types";

const initialState = {
  elligibleOpenings: [],
  currentOpenings: [],
  upcomingOpenings: []
};

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_ELLIGIBLE_OPENING:
      const newState = {
        elligibleOpenings: action.payload,
        currentOpenings: [],
        upcomingOpenings: []
      };
      return newState;
    case FETCH_APPLIED_OPENING:
      const newState2 = {
        elligibleOpenings: [],
        currentOpenings: action.payload.currentAppliedOpenings,
        upcomingOpenings: action.payload.upcomingAppliedOpenings
      };
      return newState2;
    default:
      return initialState;
  }
}