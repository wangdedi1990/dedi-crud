import React, { Component } from "react";
import PropTypes from 'prop-types';
import { getEmployees, deleteEmployee } from '../actions/employee';
import { connect } from 'react-redux';
import EmployeesList from '../components/employee/EmployeesList';
import { toastr } from 'react-redux-toastr';

class EmployeesListContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            pageIndex: this.props.match.params.page || 1
        }
    }

    static contextTypes = {
        router: PropTypes.object
    }

    static propTypes = {
        history: PropTypes.object
    }


    componentDidMount = () => {
        this.props.getEmployees(this.state.pageIndex);
    }
    

    onPageClick = (pageIndex) => {
        this.props.getEmployees(pageIndex);
        this.setState({
            pageIndex: pageIndex
        });
        this.context.router.history.push(`/employees/${pageIndex}`);
    }

    onDeleteClick = async (id) => {
        const result = await this.props.deleteEmployee(id);
        if (result.response.changes > 0) {
            toastr.success('Success', 'Employee deleted');
            this.props.getEmployees(this.state.pageIndex);
        }
    }

    render = () => {
        return (
            <EmployeesList
                employees={this.props.employees}
                pageIndex={this.state.pageIndex}
                totalCount={this.props.totalCount}
                onPageClick={this.onPageClick}
                onDeleteClick={this.onDeleteClick}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employee.data.result,
        totalCount: state.employee.data.totalCount
    }
}

const mapDispatchToProps = {
    getEmployees,
    deleteEmployee
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesListContainer);