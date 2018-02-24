import axios from 'axios';
import { FETCH_ELLIGIBLE_OPENING } from './types';
import { ERROR, START_LOADING } from '../app/types';

export const getElligibleOpenings = () => async dispatch => {
  dispatch({ type: START_LOADING });
  await axios
    .get('/smarthyre/api/v1/interviewee/opening/eligible')
    .then(res => dispatch({ type: FETCH_ELLIGIBLE_OPENING, payload: res.data }))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
