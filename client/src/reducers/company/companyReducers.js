import { FETCH_COMPANY } from '../../actions/company/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_COMPANY:
            return action.payload || false;
        default:
            return state;
    }
}