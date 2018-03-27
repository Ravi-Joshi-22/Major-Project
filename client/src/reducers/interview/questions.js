import { START_INTERVIEW } from '../../actions/interview/types';

const initialState = {
  question: 'No questions Available',
};

export default function(state = null, action) {
  switch (action.type) {
    case START_INTERVIEW:
      const newState = {
        question: action.payload.question,
      };
      return newState;
    default:
      return initialState;
  }
}
