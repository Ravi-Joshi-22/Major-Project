import { combineReducers } from 'redux';
import userReducers from './app/userReducers';
import cureentStepReducer from './app/currentStepReducer';

export default combineReducers({
  user: userReducers,
  currentStep: cureentStepReducer,
});
