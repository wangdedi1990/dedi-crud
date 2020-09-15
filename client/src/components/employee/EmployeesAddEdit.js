import React from 'react';
import Calendar from '../common/Calendar';

const EmployeesAddEdit = ({ employee, onChange, onSubmit, onGoBack }) =>
    <div className="row">
        <div className="col-lg-6">
            <div className="card">
                <form className="form-horizontal">
                    <div className="card-header">
                        <button type="button" className="btn btn-sm" onClick={onGoBack}>
                            <i className="fa fa-arrow-left"></i>
                        </button>
                        <strong>{employee.id ? "Edit" : "Add"} Employee</strong>
                    </div>
                    <div className="card-body card-block">
                        <div className="row form-group">
                            <div className="col col-md-3">
                                <label htmlFor="firstName" className="form-control-label">First Name</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input type="text" id="firstName" name="firstName" value={employee.firstName} onChange={onChange} placeholder="Enter First Name..." className="form-control" />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col col-md-3">
                                <label htmlFor="lastName" className="form-control-label">Last Name</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input type="text" id="lastName" name="lastName" value={employee.lastName} onChange={onChange} placeholder="Enter Last Name..." className="form-control" />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col col-md-3">
                                <label htmlFor="birthday" className="form-control-label">Birthday</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <Calendar onChange={(field, value) => onChange({ target: { name: 'birthday', value: value } })} value={employee.birthday} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col col-md-3">
                                <label htmlFor="gender" className="form-control-label">Gender</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <div className="radio-inline">
                                    <input className="radio-input" type="radio" name="gender" id="inlineRadio1" value="m" checked={employee.gender === "m"} onChange={onChange} />
                                    <label className="radio-label" htmlFor="inlineRadio1">Male</label>
                                </div>
                                <div className="radio-inline">
                                    <input className="radio-input" type="radio" name="gender" id="inlineRadio2" value="w" checked={employee.gender === "w"} onChange={onChange} />
                                    <label className="radio-label" htmlFor="inlineRadio2">Female</label>
                                </div>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col col-md-3">
                                <label htmlFor="lastContact" className="form-control-label">Last Contact</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <Calendar onChange={(field, value) => onChange({ target: { name: 'lastContact', value: value } })} value={employee.lastContact} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col col-md-3">
                                <label htmlFor="employeeLifetimeValue" className="form-control-label">Lifetime</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input type="text" id="employeeLifetimeValue" name="employeeLifetimeValue" value={employee.employeeLifetimeValue} onChange={onChange} placeholder="Enter Employee Lifetime Value..." className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer buttons">
                        <button type="button" onClick={onSubmit} className="btn btn-primary btn-sm">
                            <i className="fa fa-floppy-o"></i> {employee.id ? "Save Changes" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

export default EmployeesAddEdit;