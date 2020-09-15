import { combineReducers } from 'redux';
import employee from './employee';
import { reducer as toastrReducer } from 'react-redux-toastr'

export default combineReducers({
    employee,
    toastr: toastrReducer
});