import {
  FETCH_ELLIGIBLE_OPENING,
  FETCH_APPLIED_OPENING,
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
      };
      return newState;
    case FETCH_APPLIED_OPENING:
      const newState2 = {
        elligibleOpenings: [],
        currentOpenings: action.payload.currentAppliedOpenings,
        upcomingOpenings: action.payload.upcomingAppliedOpenings,
        companyCreatedOpenings: [],
        individualOpening: {},
      };
      return newState2;
    case COMPANY_VIEW_OPENINGS:
      const newState3 = {
        elligibleOpenings: [],
        currentOpenings: [],
        upcomingOpenings: [],
        companyCreatedOpenings: action.payload,
        individualOpening: {},
      };
      return newState3;
    case COMPANY_OPENING_RESULTS:
      const newState4 = {
        elligibleOpenings: [],
        currentOpenings: [],
        upcomingOpenings: [],
        companyCreatedOpenings: [],
        individualOpening: action.payload[0],
      };
      return newState4;
    default:
      return initialState;
  }
}
