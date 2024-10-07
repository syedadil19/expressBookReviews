const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const book = books.find(book => book.isbn === req.params.isbn);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    // const results = books.filter(book => book.author.toLowerCase() === req.params.author.toLowerCase());
    // if (results.length > 0) {
    //     res.status(200).json(results);
    // } else {
    //     res.status(404).json({ message: "No books found for this author" });
    // }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    // const results = books.filter(book => book.title.toLowerCase().includes(req.params.title.toLowerCase()));
    // if (results.length > 0) {
    //     res.status(200).json(results);
    // } else {
    //     res.status(404).json({ message: "No books found with that title" });
    // }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
    // const book = books.find(book => book.isbn === req.params.isbn);
    // if (book && book.reviews) {
    //     res.status(200).json(book.reviews);
    // } else {
    //     res.status(404).json({ message: "No reviews found for this book" });
    // }
});

// Registering a new user
public_users.post("/register", (req, res) => {
    // const { username, password } = req.body;
    // if (users.some(user => user.username === username)) {
    //     res.status(409).json({ message: "Username already exists" });
    // } else if (username && password) {
    //     users.push({ username, password }); // You should store a hashed password in practice
    //     res.status(201).json({ message: "User registered successfully" });
    // } else {
    //     res.status(400).json({ message: "Username and password are required" });
    // }
});

module.exports.general = public_users;