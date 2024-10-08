const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

const BOOK_SERVICE_URL="https://subhadas6836-5000.theiadocker-2-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai";

public_users.post("/register", (req,res) => {
  //Write your code here
  const {username, password} = req.body;
  console.log(`REGISTERING: User: ${username}`);

  if (username && password) {
    if (!isValid(username)) {
        console.log("REGISTER UNSUCESSFUL: user alredy exists");
        return res.status(400).json({message: "Username already exists"});
    }
    users.push({username, password});
    
    console.log("REGISTER SUCESSFUL");
    return res.status(200).json({message: "User registered successfully"});
}
// bad request
    console.log("REGISTER UNSUCESSFUL: username or password missing");
  return res.status(400).json({message: "Username or Password is missing"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// axios get request to book service "/" endpoint
const getAllBooks = async () => {
  try {
    const response = await axios.get(`${BOOK_SERVICE_URL}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let book = books[isbn];
  if (book) {
    return res.status(200).json(book);
  }
  return res.status(404).json({message: "Book with ISBN: "+ isbn +" Not Found!"});
 });

// Get book details by ISBN
const getBookByISBN = async (isbn) => {
  try {
    const response = await axios.get(`${BOOK_SERVICE_URL}/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  // convert author into lowercase
  let book = Object.values(books).filter(b => b.author.toLowerCase() === author.toLowerCase());
  if (book.length > 0) {
    // book = book[0];
    return res.status(200).json(book);
  }
  return res.status(404).json({message: "Book with Author: "+ author +" Not Found!"});
});

// Get book details by author
const getBookByAuthor = async (author) => {
  try {
    const response = await axios.get(`${BOOK_SERVICE_URL}/author/${author}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let book = Object.values(books).filter(b => b.title.toLowerCase() === title.toLowerCase());
  if (book.length > 0) {
    book = book[0];
    return res.status(200).json(book);
  }
  return res.status(404).json({message: "Book with Title: "+ title +" Not Found!"});
});

// Get book details by title
const getBookByTitle = async (title) => {
  try {
    const response = await axios.get(`${BOOK_SERVICE_URL}/title/${title}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let book = books[isbn];
  if (book) {
    return res.status(200).json(book.reviews);
  }
  return res.status(404).json({message: "Reviws for Book with ISBN: "+ isbn +" Not Found!"});
});

module.exports.general = public_users;