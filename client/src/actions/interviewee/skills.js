import axios from 'axios';
import { getUserProfileData } from './index';
import { ERROR, START_LOADING, SHOW_SUCCESS_BOX } from '../app/types';

export const addSkills = skillsData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .post('/smarthyre/api/v1/interviewee/profile/skill', skillsData)
    .then(res => {
      const successMessage = {
        msg: 'Successfully added skill.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(() => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
      dispatch(getUserProfileData());
    });
};

export const deleteSkills = skillsData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .delete('/smarthyre/api/v1/interviewee/profile/skill', {
      data: skillsData,
    })
    .then(res => {
      const successMessage = {
        msg: 'Successfully deleted skill.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(() => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
