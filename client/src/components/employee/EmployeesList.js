import React from 'react';
import Paging from 'reactjs-paging';
import { pageSize } from '../../configuration';
import { Link } from 'react-router-dom';

const EmployeesList = ({ match, employees, pageIndex, totalCount, onPageClick, onDeleteClick }) =>
    <div className="row">
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <Link to={`/add-edit-employee`} className="btn btn-primary btn-sm"><i className="fa fa-plus"></i> Create New</Link>
                </div>
                <div className="card-block">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee =>
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td className="buttons">
                                        <Link className="btn btn-default btn-sm" to={`/add-edit-employee/${employee.id}`}><i className="fa fa-pencil-square-o"></i> Edit</Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => onDeleteClick(employee.id)}><i className="fa fa-trash-o"></i> Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <nav>
                                {(totalCount > pageSize) &&
                                    <Paging
                                        pageIndex={pageIndex}
                                        groupSize={5}
                                        navSize={2}
                                        totalCount={totalCount}
                                        pageSize={pageSize}
                                        onClick={onPageClick} />
                                }
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

export default EmployeesList;