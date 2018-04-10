import {
  FETCH_ELLIGIBLE_OPENING,
  FETCH_APPLIED_OPENING,
  FETCH_RESULTS,
} from '../actions/interviewee/types';
import {
  COMPANY_VIEW_OPENINGS,
  COMPANY_OPENING_RESULTS,
} from '../actions/company/types';

const initialState = {
  elligibleOpenings: [],
  currentOpenings: [],
  upcomingOpenings: [],
  companyCreatedOpenings: [],
  individualOpening: {},
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
        individualOpening: {},
        results: [],
      };
      return newState;
    case FETCH_APPLIED_OPENING:
      const newState2 = {
        elligibleOpenings: [],
        currentOpenings: action.payload.currentAppliedOpenings,
        upcomingOpenings: action.payload.upcomingAppliedOpenings,
        companyCreatedOpenings: [],
        individualOpening: {},
        results: [],
      };
      return newState2;
    case COMPANY_VIEW_OPENINGS:
      const newState3 = {
        elligibleOpenings: [],
        currentOpenings: [],
        upcomingOpenings: [],
        companyCreatedOpenings: action.payload,
        individualOpening: {},
        results: [],
      };
      return newState3;
    case COMPANY_OPENING_RESULTS:
      const newState4 = {
        elligibleOpenings: [],
        currentOpenings: [],
        upcomingOpenings: [],
        companyCreatedOpenings: [],
        individualOpening: action.payload[0],
        results: action.payload,
      };
      return newState4;
    case FETCH_RESULTS:
      const newState5 = {
        elligibleOpenings: [],
        currentOpenings: [],
        upcomingOpenings: [],
        companyCreatedOpenings: [],
        individualOpening: {},
        results: action.payload,
      };
      return newState5;
    default:
      return initialState;
  }
}
