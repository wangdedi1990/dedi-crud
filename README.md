# Dedi-CRUD
A SPA that CRUD employee data. Client-side project uses [CoreUI](https://github.com/mrholek/CoreUI-Free-Bootstrap-Admin-Template) admin template.

## Getting Started

- `git clone https://github.com/wangdedi1990/dedi-crud.git`
- `npm run postinsall`
- `npm run install`
- `npm run start-dev`

Migration script inserts demo data in database for test usage. In order to reset the database to initial state, just delete `database.sqlite` file. 

## To run tests in client project

- `cd client`
- `cd npm run test`

## Overview of libraries

 - `sqlite` - sqlite was chosen as data source because it is fast, easy 

 - `express` - rest api implemented using Express Nodejs framework

 - `redux` + `redux-thunk` - state management library

 - `jest` - client test framework
