import { combineReducers } from 'redux';
import userReducers from './app/userReducers';
import cureentStepReducer from './app/currentStepReducer';
import companyReducer from './company/companyReducers'

export default combineReducers({
  user: userReducers,
  currentStep: cureentStepReducer,
  company: companyReducer,
});
