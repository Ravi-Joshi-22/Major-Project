import axios from 'axios';
import {
  FETCH_COMPANY,
  HIDE_COMPANY_OPENING_MODAL,
  SHOW_COMPANY_OPENING_MODAL,
  COMPANY_DASH,
} from './types';
import { ERROR, START_LOADING } from '../app/types';

export const handleToken = token => async dispatch => {
  axios
    .post('/smarthyre/api/v1/company/opening/addCredits', token)
    .then(res => dispatch({ type: FETCH_COMPANY, payload: res.data }))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const newOpening = openingData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .post('/smarthyre/api/v1/company/opening/new', openingData)
    .then(res => {
      dispatch({ type: HIDE_COMPANY_OPENING_MODAL });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const fetchDash = () => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .get('/smarthyre/api/v1/company/custom/dashboard')
    .then(res => dispatch({ type: COMPANY_DASH, payload: res.data }))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const showOpeningModal = () => ({ type: SHOW_COMPANY_OPENING_MODAL });
export const hideOpeningModal = () => ({ type: HIDE_COMPANY_OPENING_MODAL });
