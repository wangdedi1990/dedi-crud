import { GET_EMPLOYEES, ADD_EMPLOYEE, GET_EMPLOYEE, EDIT_EMPLOYEE, DELETE_EMPLOYEE } from './actionTypes';
import { apiUrl, pageSize } from '../configuration';
import { toastr } from 'react-redux-toastr';

export const getEmployees = (pageIndex) => async (dispatch, getState) => {

    const apiResponse = await fetch(`${apiUrl}/employees?pageIndex=${pageIndex}&pageSize=${pageSize}`);

    const responseData = await apiResponse.json();

    return dispatch({
        type: GET_EMPLOYEES,
        response: responseData
    });
}

export const getEmployee = (id) => async (dispatch, getState) => {

    const apiResponse = await fetch(`${apiUrl}/employees/${id}`);

    const responseData = await apiResponse.json();
    return dispatch({
        type: GET_EMPLOYEE,
        response: responseData
    });
}

export const addEmployee = (employee) => async (dispatch, getState) => {
    try {
        const apiResponse = await fetch(`${apiUrl}/employees`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee)
            });

        const responseData = await apiResponse.json();

        return dispatch({
            type: ADD_EMPLOYEE,
            response: responseData
        });
    } catch (error) {
        toastr.error('Error', 'Problem occured during saving employee.');
    }
}

export const editEmployee = (employee) => async (dispatch, getState) => {
    try {
        const apiResponse = await fetch(`${apiUrl}/employees/${employee.id}`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee)
            });

        const responseData = await apiResponse.json();

        return dispatch({
            type: EDIT_EMPLOYEE,
            response: responseData
        });
    } catch (error) {
        toastr.error('Error', 'Problem occured during saving employee.');
    }
}

export const deleteEmployee = (id) => async (dispatch, getState) => {
    const apiResponse = await fetch(`${apiUrl}/employees/${id}`,
        {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        });

    const responseData = await apiResponse.json();

    return dispatch({
        type: DELETE_EMPLOYEE,
        response: responseData
    });
}