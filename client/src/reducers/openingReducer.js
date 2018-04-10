import {
  FETCH_ELLIGIBLE_OPENING,
  FETCH_APPLIED_OPENING,
  FETCH_RESULTS,
} from '../actions/interviewee/types';
import { COMPANY_VIEW_OPENINGS } from '../actions/company/types';

const initialState = {
  elligibleOpenings: [],
  currentOpenings: [],
  upcomingOpenings: [],
  companyCreatedOpenings: [],
  results: [],
};

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_ELLIGIBLE_OPENING:
      const newState = {
        elligibleOpenings: action.payload,
        currentOpenings: [],
        upcomingOpenings: [],
        companyCreatedOpenings: [],
        results: [],
      };
      return newState;
    case FETCH_APPLIED_OPENING:
      const newState2 = {
        elligibleOpenings: [],
        currentOpenings: action.payload.currentAppliedOpenings,
        upcomingOpenings: action.payload.upcomingAppliedOpenings,
        companyCreatedOpenings: [],
        results: [],
      };
      return newState2;
    case COMPANY_VIEW_OPENINGS:
      const newState3 = {
        elligibleOpenings: [],
        currentOpenings: [],
        upcomingOpenings: [],
        companyCreatedOpenings: action.payload,
        results: [],
      };
      return newState3;
    case FETCH_RESULTS:
      const newState4 = {
        elligibleOpenings: [],
        currentOpenings: [],
        upcomingOpenings: [],
        companyCreatedOpenings: [],
        results: action.payload,
      };
      return newState4;
    default:
      return initialState;
  }
}
