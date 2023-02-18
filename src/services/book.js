const express = require('express');
const bodyParser = require('body-parser');
require('../db/db');
const Book = require('../models/Book');

const app = express();
const port = 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    // console.log({ originalUrl: req.originalUrl, query: req.query, params: req.params, body: req.body });
    const newBook = new Book(req.body);
    newBook.save().then(() => {
        console.log(newBook);
        res.send('New Book added successfully!');
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
});

app.get('/books', (req, res) => {
    // console.log({ originalUrl: req.originalUrl, query: req.query, params: req.params, body: req.body });
    Book.find().then((books) => {
        if (books.length !== 0) {
            res.json(books);
        } else {
            res.status(404).send('Books not found');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
});

app.get('/book/:id', (req, res) => {
    // console.log({ originalUrl: req.originalUrl, query: req.query, params: req.params, body: req.body });
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book);
        } else {
            res.status(404).send('Books not found');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
});

app.delete('/book/:id', (req, res) => {
    // Book.findOneAndRemove(req.params.id)
    Book.findOne({ _id: req.params.id }).then((book) => {
        if (book) {
            book.remove();
            res.json(book);
        } else {
            res.status(404).send('Book Not found!');
        }
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

app.listen(port, () => {
    console.log(`Up and Running on port ${port} - This is Book service`);
});