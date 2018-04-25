import {
  HIDE_COMPANY_OPENING_MODAL,
  SHOW_COMPANY_OPENING_MODAL,
} from '../../actions/company/types';

const initialState = {
  companyOpeningModal: {
    show: 'modal',
    data: null,
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HIDE_COMPANY_OPENING_MODAL:
      return {
        ...state,
        companyOpeningModal: {
          show: 'modal',
          data: '',
        },
      };
    case SHOW_COMPANY_OPENING_MODAL:
      return {
        ...state,
        companyOpeningModal: {
          show: 'modal is-active',
          data: action.payload,
        },
      };
    default:
      return initialState;
  }
}
