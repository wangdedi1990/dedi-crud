import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EmployeesAddEdit from '../components/employee/EmployeesAddEdit';
import { addEmployee, getEmployee, editEmployee } from '../actions/employee';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router';
import { ruleRunner, run } from '../utils/validation';
import { required } from '../utils/validation/rules';

class EmployeesAddEditContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            birthday: new Date(),
            gender: '',
            lastContact: new Date(),
            employeeLifetimeValue: ''
        }
    }

    static contextTypes = {
        router: PropTypes.object
    }

    static propTypes = {
        history: PropTypes.object
    }

    componentWillMount = () => {
        if (this.props.match.params.id) {
            this.props.getEmployee(this.props.match.params.id);
        }
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.employee !== this.state) {
            this.setState(nextProps.employee);
        }
    }

    onChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmit = async () => {
        let result;

        const validationErrors = run(this.state, fieldValidations);

        if (Object.keys(validationErrors).length > 0) {
            toastr.error('Error', validationErrors[Object.keys(validationErrors)[0]]);
            return;
        }

        if (this.state.id) {
            result = await this.props.editEmployee(this.state);
            if (result && result.response.changes > 0) {
                toastr.success('Success', 'Employee edited successfully');
                this.context.router.history.push(`/employees`);
            }
        }
        else {
            result = await this.props.addEmployee(this.state);

            if (result && result.response.lastId > 0) {
                toastr.success('Success', 'Employee added successfully');
                this.context.router.history.push(`/employees`);
            }
        }
    }

    onGoBack = () => {
        this.props.history.goBack();
    }

    render = () => {
        return (
            this.state && <EmployeesAddEdit
                employee={this.state}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                onGoBack={this.onGoBack}
            />
        )
    }
}

const fieldValidations = [
    ruleRunner("firstName", "First name", required),
    ruleRunner("lastName", "Last name", required)
];

const mapStateToProps = state => {
    return {
        employee: state.employee.single
    }
}

const mapDispatchToProps = {
    addEmployee,
    editEmployee,
    getEmployee
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeesAddEditContainer));