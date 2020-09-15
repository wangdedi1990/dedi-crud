import { GET_EMPLOYEES, GET_EMPLOYEE } from '../actions/actionTypes';

const initialState = {
    single: {
        id: '',
        title: '',
        description: ''
    },
    data: {
        result: [],
        totalCount: 0
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEES:
            return {
                ...state,
                data: {
                    result: action.response.data,
                    totalCount: action.response.totalCount
                }
            };
        case GET_EMPLOYEE:
            return {
                ...state,
                single: action.response
            };
        default:
            return state;
    }
}