import axios from 'axios';
import { START_INTERVIEW, GIVE_INTERVIEW, RESET_TIMER, FINISH } from './types';
import { ERROR, START_LOADING, SHOW_SUCCESS_BOX } from '../app/types';

export const getQuestions = interviewTrackId => async dispatch => {
  dispatch({ type: START_LOADING });
  await axios
    .get(
      '/smarthyre/api/v1/interviewee/interview/start?openingTrackId=' +
        interviewTrackId
    )
    .then(res => dispatch({ type: START_INTERVIEW, payload: res.data }))
    .then(dispatch(resetTimer))
    .catch(err => {
      const errorMessage = {
        msg: 'Something went wrong',
      };
      dispatch({ type: ERROR, payload: errorMessage });
    });
};

export const giveAnswer = answerData => async dispatch => {
  dispatch({ type: START_LOADING });
  await axios
    .post('/smarthyre/api/v1/interviewee/interview/give', answerData)
    .then(res => {
      if (res.data.count === res.data.questions.length) {
        const successMessage = {
          msg: 'Successfully completed interview',
        };
        dispatch({ type: SHOW_SUCCESS_BOX, payload: successMessage });
      } else {
        dispatch(getQuestions(answerData.openingTrackId));
      }
    })
    .then(() =>{console.log("111111");dispatch(finishI)})
    .catch(err => {
      const errorMessage = {
        msg: 'Something went wrong',
      };
      dispatch({ type: ERROR, payload: errorMessage });
    });
};

export const resetTimer = () => ({
  type: RESET_TIMER,
  payload: 120,
});

export const finishI = () => ({
  type: FINISH,
  payload: 'post',
});