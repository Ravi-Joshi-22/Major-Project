import axios from "axios";
import {
  REGISTER_COMPANY,
  LOGIN,
  CUREENT_STEP,
  VERIFY_OTP,
  REGISTER_USER
} from "./types";

export const registerCompany = (
  companyData,
  userData,
  history
) => async dispatch => {
  const company = {
    name: companyData.companyName,
    number: companyData.companyNumber,
    phone: companyData.companyPhone,
    url: companyData.companyLogoUrl,
    website: companyData.companyWebsite
  };
  const address = {
    address_line: companyData.companyAddress,
    city: companyData.companyCity,
    pin: companyData.companyPin,
    state: "M.P",
    country: "India"
  };
  const user = userData;
  const data = {
    company,
    address,
    user
  };
  const res = await axios.post("/smarthyre/api/v1/app/company", data);
  history.push("/");
  dispatch({ type: REGISTER_COMPANY, payload: res.data });
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
        value: intervieweeData.secondary.value
      },
      year_of_comp: intervieweeData.secondary.year_of_comp,
      board: intervieweeData.secondary.board,
      school: intervieweeData.secondary.school
    },
    senior_sec: {
      performance: {
        scale: intervieweeData.seniorSecondary.performance,
        value: intervieweeData.seniorSecondary.value
      },
      year_of_comp: intervieweeData.seniorSecondary.year_of_comp,
      board: intervieweeData.seniorSecondary.board,
      school: intervieweeData.seniorSecondary.school
    }
  };
  intervieweeData.before_senior_sec = beforeSeniorSec;
  intervieweeData.user = userData;
  const res = await axios.post(
    "/smarthyre/api/v1/app/interviewee",
    intervieweeData
  );
  history.push("/");
  dispatch({ type: REGISTER_USER, payload: res.data });
};

export const login = loginData => async dispatch => {
  const res = await axios.post("/smarthyre/api/v1/app/login", loginData);
  dispatch({ type: LOGIN, payload: res.data });
};

export const changeCurrentStep = stepNo => dispatch => {
  dispatch({ type: CUREENT_STEP, payload: stepNo });
};

export const verifyOTP = (userId, OTP, history) => async dispatch => {
  const requestData = {
    id: userId,
    otp: OTP
  };
  const res = await axios.post("/smarthyre/api/v1/app/verifyOTP", requestData);
  history.push("/dashboard");
};
