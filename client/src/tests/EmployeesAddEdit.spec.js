import React from 'react'
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import EmployeesAddEdit from '../components/employee/EmployeesAddEdit';
import getContextProvider, { contextObject } from './ContextProvider';

configure({ adapter: new Adapter() });

const mockEmployee = {
    id: 15,
    firstName: "Eliseo",
    lastName: "Goldfarb",
    birthday: "1969-11-19T21:00:00.000Z",
    gender: "m",
    lastContact: "2017-03-18T12:20:06.702Z",
    employeeLifetimeValue: 1019.91
};

describe('Employee Add/Edit Snapshot', () => {
    const reactElement = getContextProvider(contextObject,
        <EmployeesAddEdit employee={mockEmployee} onChange={()=>{}} />
    );
    it('Capturing Snapshot of Employee Add/Edit Snapshot', () => {
        const renderedValue = renderer.create(reactElement).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });
});

describe('Component Render Tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <MemoryRouter>
                <EmployeesAddEdit employee={mockEmployee} onChange={()=>{}} />
            </MemoryRouter>);
    });

    it('Render the DUMB component', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('Display "Eliseo" in first input', () => {
        expect(wrapper.find('#firstName').props().value).toEqual('Eliseo');
    });

    it('Display "Goldfarb" in first input', () => {
        expect(wrapper.find('#lastName').props().value).toEqual('Goldfarb');
    });

    it('Display "20-Nov-1969" in birthday input', () => {
        expect(wrapper.find('.form-control').at(2).props().value).toEqual('20-Nov-1969');
    });

    it('Display "18-Mar-2017" in last contact input', () => {
        expect(wrapper.find('.form-control').at(3).props().value).toEqual('18-Mar-2017');
    });

    it('Display "1019.91" in employeeLifetimeValue input', () => {
        expect(wrapper.find('#employeeLifetimeValue').props().value).toEqual(1019.91);
    });
});