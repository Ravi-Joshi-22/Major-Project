import axios from 'axios';
import { FETCH_TEST_USER } from './types';

export const fetchTestUser = () => async dispatch => {
  const res = await axios.get('/smarthyre/api/v1/app');
  dispatch({ type: FETCH_TEST_USER, payload: res.data });
};
