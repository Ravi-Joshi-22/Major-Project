import axios from 'axios';
import { getUserProfileData } from './index';
import { FETCH_USER_PROFILE } from './types';
import { ERROR, START_LOADING, SHOW_SUCCESS_BOX } from '../app/types';

export const addProfession = professionData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .post('/smarthyre/api/v1/interviewee/profile/profession', professionData)
    .then(res => {
      const successMessage = {
        msg: 'Successfully added profession.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(() => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const deleteProfession = professionData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .delete('/smarthyre/api/v1/interviewee/profile/profession', {
      data: professionData,
    })
    .then(res => {
      const successMessage = {
        msg: 'Successfully deleted profession.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(() => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
