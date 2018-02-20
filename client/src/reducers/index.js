import { combineReducers } from 'redux';
import userReducers from './app/userReducers';
import cureentStepReducer from './app/currentStepReducer';
import companyReducer from './company/companyReducers';
import companyDashReducer from './company/companyDash';

export default combineReducers({
  auth: userReducers,
  currentStep: cureentStepReducer,
  company: companyReducer,
  companyDash: companyDashReducer,
});
