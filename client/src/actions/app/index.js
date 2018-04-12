import axios from 'axios';
import {
  REGISTER_COMPANY,
  FETCH_USER,
  CUREENT_STEP,
  VERIFY_OTP,
  REGISTER_USER,
  CLEAR_ERROR,
  ERROR,
  START_LOADING,
  SHOW_SUCCESS_BOX,
  HIDE_SUCCESS_BOX,
  STORE_TRACK_ID,
} from './types';

export const registerCompany = (
  companyData,
  userData,
  history
) => async dispatch => {
  dispatch({ type: START_LOADING });
  const company = {
    name: companyData.companyName,
    number: companyData.companyNumber,
    phone: companyData.companyPhone,
    url: companyData.companyLogoUrl,
    website: companyData.companyWebsite,
  };
  const address = {
    address_line: companyData.companyAddress,
    city: companyData.companyCity,
    pin: companyData.companyPin,
    state: 'M.P',
    country: 'India',
  };
  const user = userData;
  const data = {
    company,
    address,
    user,
  };
  axios
    .post('/smarthyre/api/v1/app/company', data)
    .then(res => {
      history.push('/');
      dispatch({ type: REGISTER_COMPANY, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const registerInterview = (
  userData,
  intervieweeData,
  history
) => async dispatch => {
  const beforeSeniorSec = {
    secondary: {
      performance: {
        scale: intervieweeData.secondary.performance,
        value: intervieweeData.secondary.value,
      },
      year_of_comp: intervieweeData.secondary.year_of_comp,
      board: intervieweeData.secondary.board,
      school: intervieweeData.secondary.school,
    },
    senior_sec: {
      performance: {
        scale: intervieweeData.seniorSecondary.performance,
        value: intervieweeData.seniorSecondary.value,
      },
      year_of_comp: intervieweeData.seniorSecondary.year_of_comp,
      board: intervieweeData.seniorSecondary.board,
      school: intervieweeData.seniorSecondary.school,
    },
  };
  intervieweeData.before_senior_sec = beforeSeniorSec;
  intervieweeData.user = userData;
  axios
    .post('/smarthyre/api/v1/app/interviewee', intervieweeData)
    .then(res => {
      history.push('/');
      dispatch({ type: REGISTER_USER, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const login = loginData => async dispatch => {
  dispatch({ type: START_LOADING });
  await axios
    .post('/smarthyre/api/v1/app/login', loginData)
    .then(res => {
      dispatch({ type: FETCH_USER, payload: res.data });
    })
    .catch(err => {
      const error = {
        msg: 'Email and password do not matched',
      };
      dispatch({ type: ERROR, payload: error });
    });
};

export const changeCurrentStep = stepNo => dispatch => {
  dispatch({ type: CUREENT_STEP, payload: stepNo });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/smarthyre/api/v1/app/fetchUser');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const verifyOTP = (userId, OTP, history) => async dispatch => {
  const requestData = {
    id: userId,
    otp: OTP,
  };
  axios
    .post('/smarthyre/api/v1/app/verifyOTP', requestData)
    .then(err => {
      history.push('/');
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data });
    });
};

export const logout = history => async dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .get('/smarthyre/api/v1/app/logout')
    .then(() => {
      history.push('/');
      const success = {
        msg: 'Successfully Logged Out!!',
      };
      dispatch({ type: SHOW_SUCCESS_BOX, payload: success });
    })
    .catch(err => {
      const error = {
        msg: 'Failed To Logout!!!',
      };
      dispatch({ type: ERROR, payload: error });
    });
};

export const storeTrackId = trackId => ({
  type: STORE_TRACK_ID,
  payload: trackId,
});

export const clearError = () => ({ type: CLEAR_ERROR });
export const startLoading = () => ({ type: START_LOADING });
export const hideSuccessBox = () => ({ type: HIDE_SUCCESS_BOX });
