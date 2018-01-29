import axios from 'axios';
import { FETCH_COMPANY, CREATE_OPENING } from './types';

export const handleToken = token => async dispatch => {
    const res = await axios.post('/smarthyre/api/v1/company/opening/addCredits', token);
    dispatch({ type: FETCH_COMPANY, payload: res.data });
};

export const newOpening = openingData => async dispatch => {
    const res = await axios.post('/smarthyre/api/v1/company/opening/new', openingData);
    dispatch({ type: CREATE_OPENING, payload: res.data });
};