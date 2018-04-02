import axios from 'axios';
import {
  FETCH_COMPANY,
  HIDE_COMPANY_OPENING_MODAL,
  SHOW_COMPANY_OPENING_MODAL,
  COMPANY_DASH,
  COMPANY_VIEW_OPENINGS,
  COMPANY_DELETE_OPENING,
  COMPANY_UPDATE_OPENING,
} from './types';
import { ERROR, START_LOADING, SHOW_SUCCESS_BOX } from '../app/types';

export const handleToken = token => async dispatch => {
  axios
    .post('/smarthyre/api/v1/company/opening/addCredits', token)
    .then(res => {
      dispatch({ type: FETCH_COMPANY, payload: res.data });
    })
    .then(() => {
      const success = {
        msg: 'Successfully added credit',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: success });
    })
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

export const companyViewOpenings = () => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .get('/smarthyre/api/v1/company/opening')
    .then(res => dispatch({ type: COMPANY_VIEW_OPENINGS, payload: res.data }))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const companyDeleteOpenings = deleteObj => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .delete('/smarthyre/api/v1/company/opening?openingId=' + deleteObj)
    .then(() => {
      const success = {
        msg: 'Successfully deleted',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: success });
    })
    .then(() => dispatch(companyViewOpenings()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const companyUpdateOpenings = updateCompanyData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .put('/smarthyre/api/v1/company/opening', updateCompanyData)
    .then(res => {
      const successMessage = {
        msg: 'Successfully updated the opening',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(() => dispatch(companyViewOpenings()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const showOpeningModal = data => ({
  type: SHOW_COMPANY_OPENING_MODAL,
  payload: data,
});

export const hideOpeningModal = () => ({ type: HIDE_COMPANY_OPENING_MODAL });
