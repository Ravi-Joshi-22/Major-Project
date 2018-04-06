import axios from 'axios';
import {
  FETCH_ELLIGIBLE_OPENING,
  FETCH_APPLIED_OPENING,
  FETCH_USER_PROFILE,
  FETCH_RESULTS,
} from './types';
import { ERROR, START_LOADING, SHOW_SUCCESS_BOX } from '../app/types';

export const getElligibleOpenings = () => async dispatch => {
  dispatch({ type: START_LOADING });
  await axios
    .get('/smarthyre/api/v1/interviewee/opening/eligible')
    .then(res => dispatch({ type: FETCH_ELLIGIBLE_OPENING, payload: res.data }))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const getAppliedOpenings = () => async dispatch => {
  dispatch({ type: START_LOADING });
  await axios
    .get('/smarthyre/api/v1/interviewee/opening/applied')
    .then(res => dispatch({ type: FETCH_APPLIED_OPENING, payload: res.data }))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const applyForOpening = openingData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .post('/smarthyre/api/v1/interviewee/opening/apply', openingData)
    .then(res => dispatch(getElligibleOpenings()))
    .then(() => {
      const successMessage = {
        msg: 'Successfully applied for the opening.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const getUserProfileData = () => async dispatch => {
  dispatch({ type: START_LOADING });
  await axios
    .get('/smarthyre/api/v1/interviewee/profile')
    .then(res => dispatch({ type: FETCH_USER_PROFILE, payload: res.data }))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const getUserResults = () => async dispatch => {
  dispatch({ type: START_LOADING });
  await axios
    .get('/smarthyre/api/v1/interviewee/opening/results')
    .then(res => dispatch({ type: FETCH_RESULTS, payload: res.data }))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
