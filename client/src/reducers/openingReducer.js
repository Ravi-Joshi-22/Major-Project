import {
  FETCH_ELLIGIBLE_OPENING,
  FETCH_APPLIED_OPENING,
} from '../actions/interviewee/types';
import { COMPANY_VIEW_OPENINGS } from '../actions/company/types';

const initialState = {
  elligibleOpenings: [],
  currentOpenings: [],
  upcomingOpenings: [],
  companyCreatedOpenings: [],
};

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_ELLIGIBLE_OPENING:
      const newState = {
        elligibleOpenings: action.payload,
        currentOpenings: [],
        upcomingOpenings: [],
        companyCreatedOpenings: [],
      };
      return newState;
    case FETCH_APPLIED_OPENING:
      const newState2 = {
        elligibleOpenings: [],
        currentOpenings: action.payload.currentAppliedOpenings,
        upcomingOpenings: action.payload.upcomingAppliedOpenings,
        companyCreatedOpenings: [],
      };
      return newState2;
    case COMPANY_VIEW_OPENINGS:
      const newState3 = {
        elligibleOpenings: [],
        currentOpenings: [],
        upcomingOpenings: [],
        companyCreatedOpenings: action.payload,
      };
      return newState3;
    default:
      return initialState;
  }
}
