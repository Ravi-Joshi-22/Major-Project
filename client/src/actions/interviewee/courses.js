import axios from 'axios';
import { ERROR, START_LOADING, SHOW_SUCCESS_BOX } from '../app/types';
import { FETCH_USER_PROFILE } from './types';
import { getUserProfileData } from './index';

export const addCourses = courseData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .post('/smarthyre/api/v1/interviewee/profile/course', courseData)

    .then(res => {
      const successMessage = {
        msg: 'Successfully added course.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(res => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
