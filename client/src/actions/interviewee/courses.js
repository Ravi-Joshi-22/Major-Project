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

export const deleteCourses = courseData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .delete('/smarthyre/api/v1/interviewee/profile/course', {
      data: courseData,
    })
    .then(res => {
      const successMessage = {
        msg: 'Successfully deleted course.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(() => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const addTest = testData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .post('/smarthyre/api/v1/interviewee/profile/test', testData)
    .then(res => {
      const successMessage = {
        msg: 'Successfully added test.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(res => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
export const deleteTest = testData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .delete('/smarthyre/api/v1/interviewee/profile/test', {
      data: testData,
    })
    .then(res => {
      const successMessage = {
        msg: 'Successfully deleted test.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(() => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const addCertification = certificateData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .post(
      '/smarthyre/api/v1/interviewee/profile/certification',
      certificateData
    )
    .then(res => {
      const successMessage = {
        msg: 'Successfully added certification.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(res => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
export const deleteCertificate = certificateData => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .delete('/smarthyre/api/v1/interviewee/profile/certification', {
      data: certificateData,
    })
    .then(res => {
      const successMessage = {
        msg: 'Successfully deleted test.',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
    })
    .then(() => dispatch(getUserProfileData()))
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
