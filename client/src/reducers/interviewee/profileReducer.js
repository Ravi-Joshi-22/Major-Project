import { FETCH_USER_PROFILE } from '../../actions/interviewee/types';

const initialState = {
  after_senior_sec: [],
  jobs: [],
  internships: [],
  skills: [],
  courses: [],
  certifications: [],
  tests: [],
  projects: [],
  additionals: [],
  userId: null,
  percent: 0,
};

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return action.payload;
    default:
      return initialState;
  }
}
