import axios from 'axios';
import { START_INTERVIEW, GIVE_INTERVIEW } from './types';
import { ERROR, START_LOADING, SHOW_SUCCESS_BOX } from '../app/types';

export const getQuestions = interviewTrackId => async dispatch => {
  console.log(interviewTrackId);
  dispatch({ type: START_LOADING });
  await axios
    .get(
      '/smarthyre/api/v1/interviewee/interview/start?openingTrackId=' +
        interviewTrackId
    )
    .then(res => dispatch({ type: START_INTERVIEW, payload: res.data }))
    .catch(err => {
      const errorMessage = {
        msg: 'Something went wrong',
      };
      dispatch({ type: ERROR, payload: errorMessage });
    });
};
