import axios from 'axios';
import { ERROR, START_LOADING, SHOW_SUCCESS_BOX } from '../app/types';
import { FETCH_USER_PROFILE } from './types';
import { getUserProfileData } from './index';

export const addDegree = degreeData => async dispatch => {
  console.log(degreeData);
  dispatch({ type: START_LOADING });
  axios
    .post('/smarthyre/api/v1/interviewee/profile/degree', degreeData)

    .then(res => {
      const successMessage = {
        msg: 'Successfully added Degree.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(res => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
export const deleteDegree = degreeData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .delete('/smarthyre/api/v1/interviewee/profile/degree', {
      data: degreeData,
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
