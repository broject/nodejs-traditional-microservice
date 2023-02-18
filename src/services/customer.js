const express = require('express');
const bodyParser = require('body-parser');
require('../db/db');
const Customer = require('../models/Customer');

const app = express();
const port = 5000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.post('/customer', (req, res) => {
    const newCustomer = new Customer({ ...req.body });
    newCustomer.save().then(() => {
        res.send('New Customer created successfully!');
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
});

app.get('/customers', (req, res) => {
    Customer.find().then((customers) => {
        if (customers) {
            res.json(customers);
        } else {
            res.status(404).send('customers not found');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
});

app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).send('customer not found');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
});

app.delete('/customer/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id).then((customer) => {
        if (customer) {
            res.json('customer deleted Successfully!');
        } else {
            res.status(404).send('Customer Not Found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
});

app.listen(port, () => {
    console.log(`Up and Running on port ${port}- This is Customer service`);
});