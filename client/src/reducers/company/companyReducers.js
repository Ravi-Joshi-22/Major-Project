import { FETCH_COMPANY,COMPANY_DASH } from '../../actions/company/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_COMPANY:
            return action.payload || false;
        case COMPANY_DASH:
            return action.payload || false;
        default:
            return state;
    }
}