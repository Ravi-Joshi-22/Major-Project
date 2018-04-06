import { combineReducers } from 'redux';
import userReducers from './app/userReducers';
import errorReducer from './app/error';
import loadingReducer from './app/loadingReducer';
import cureentStepReducer from './app/currentStepReducer';
import modalReducer from './app/modalReducer';
import successBoxReducer from './app/successBoxReducer';
import trackIdReducer from './app/trackIdReducer';
import companyReducer from './company/companyReducers';
import companyDashReducer from './company/companyDash';
import intervieweeProfileReducer from './interviewee/profileReducer';
import intervieweeOpeningReducer from './openingReducer';
import progressReducer from './interview/progress';
import questionsReducer from './interview/questions';

export default combineReducers({
  auth: userReducers,
  currentStep: cureentStepReducer,
  company: companyReducer,
  companyDash: companyDashReducer,
  error: errorReducer,
  loading: loadingReducer,
  intervieweeOpenings: intervieweeOpeningReducer,
  modals: modalReducer,
  successBox: successBoxReducer,
  intervieweeProfile: intervieweeProfileReducer,
  questionName: questionsReducer,
  interviewId: trackIdReducer,
  progress: progressReducer,
});
