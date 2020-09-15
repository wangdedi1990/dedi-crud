const express = require('express');
const database = require('../database');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const pageIndex = req.query.pageIndex || 1;
        const pageSize = req.query.pageSize || 10;

        const employees = await database.all('SELECT * FROM EMPLOYEE ORDER BY id DESC LIMIT ?,?', ((pageIndex - 1) * pageSize), pageSize);
        const totalCount = await database.get('SELECT COUNT(*) as "Count" FROM EMPLOYEE');

        res.send({
            data: employees,
            totalCount: totalCount.Count
        });
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const employee = await database.get('SELECT * FROM EMPLOYEE WHERE id = ?', req.params.id);
        res.send(employee);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const employeeRequest = req.body;
        const result = await database.run('INSERT INTO EMPLOYEE(firstName, lastName, birthday, gender, lastContact, employeeLifetimeValue) VALUES(?,?,?,?,?,?)',
            employeeRequest.firstName, employeeRequest.lastName, employeeRequest.birthday, employeeRequest.gender, employeeRequest.lastContact, employeeRequest.employeeLifetimeValue);
        res.send({
            lastId: result.stmt.lastID
        });
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const employeeRequest = req.body;
        const result = await database.run('UPDATE EMPLOYEE SET firstName = ?, lastName = ?, birthday = ?, gender = ?, lastContact = ?,employeeLifetimeValue = ? where id = ?',
            employeeRequest.firstName, employeeRequest.lastName, employeeRequest.birthday, employeeRequest.gender, employeeRequest.lastContact, employeeRequest.employeeLifetimeValue, req.params.id);
        res.send({
            changes: result.stmt.changes
        });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await database.run('DELETE FROM EMPLOYEE WHERE id = ?', req.params.id);
        res.send({
            lastID: result.stmt.lastID,
            changes: result.stmt.changes
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;