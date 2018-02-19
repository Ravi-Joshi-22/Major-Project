import { COMPANY_DASH } from '../../actions/company/types';

export default function (state = null, action) {
    switch (action.type) {
       
        case COMPANY_DASH:
            return action.payload || false;
        default:
            return state;
    }
}