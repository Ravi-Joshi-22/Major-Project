import { combineReducers } from 'redux';
import userReducers from './app/userReducers';
import errorReducer from './app/error';
import loadingReducer from './app/loadingReducer';
import cureentStepReducer from './app/currentStepReducer';
import modalReducer from './app/modalReducer';
import companyReducer from './company/companyReducers';
import companyDashReducer from './company/companyDash';
import intervieweeOpeningReducer from './openingReducer';
import successBoxReducer from './app/successBoxReducer';

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
});
