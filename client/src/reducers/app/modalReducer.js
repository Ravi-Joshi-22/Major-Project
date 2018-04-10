import {
  HIDE_COMPANY_OPENING_MODAL,
  SHOW_COMPANY_OPENING_MODAL,
} from '../../actions/company/types';

const initialState = {
  companyOpeningModal: 'modal',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HIDE_COMPANY_OPENING_MODAL:
      return {
        ...state,
        companyOpeningModal: 'modal',
      };
    case SHOW_COMPANY_OPENING_MODAL:
      return {
        ...state,
        companyOpeningModal: 'modal is-active',
      };
    default:
      return initialState;
  }
}
