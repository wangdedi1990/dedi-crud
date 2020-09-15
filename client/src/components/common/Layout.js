import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from './Header';
import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';
import Aside from './Aside';
import Footer from './Footer';
import EmployeesListContainer from '../../containers/EmployeesListContainer';
import EmployeesAddEditContainer from '../../containers/EmployeesAddEditContainer';

const Layout = ({ props }) => (
  <div className="app">
    <Header />
    <div className="app-body">
      <Sidebar {...props} />
      <main className="main">
        <Breadcrumb />
        <Container fluid>
          <Switch>
            <Route path="/employees/:page" name="Employees" component={EmployeesListContainer} />
            <Route path="/employees" name="Employees" component={EmployeesListContainer} />
            <Route path="/add-edit-employee/:id" name="Add/Edit Employee" component={EmployeesAddEditContainer} />
            <Route path="/add-edit-employee" name="Add/Edit Employee" component={EmployeesAddEditContainer} />
            <Redirect from="/" to="/employees" />
          </Switch>
        </Container>
      </main>
      <Aside />
    </div>
    <Footer />
  </div>
);

export default Layout;