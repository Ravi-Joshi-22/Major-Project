import axios from 'axios';
import { ERROR, START_LOADING, SHOW_SUCCESS_BOX } from '../app/types';
import { FETCH_USER_PROFILE } from './types';
import { getUserProfileData } from './index';

export const addProject = projectData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .post('/smarthyre/api/v1/interviewee/profile/project', projectData)

    .then(res => {
      const successMessage = {
        msg: 'Successfully added project.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(res => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
export const deleteProject = projectData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .delete('/smarthyre/api/v1/interviewee/profile/project', {
      data: projectData,
    })
    .then(res => {
      const successMessage = {
        msg: 'Successfully deleted Project.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(() => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
