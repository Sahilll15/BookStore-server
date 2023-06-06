const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Book = require('../models/book')


module.exports.addBook = async (req, res) => {

    const { title, author, description, price, image, createdAt } = req.body;

    try {
        const newBook = await Book.create({
            title, author, description, price, image, createdAt
        })
        res.status(200).json({ msg: "Book added successfully", book: newBook })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server Error" })
    }
}


module.exports.getBooks = async (req, res) => {
    try {
        let query = {};


        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query = {
                $or: [
                    { title: searchRegex },
                    { author: searchRegex },
                    { description: searchRegex }
                ]
            };
        }


        if (req.query.filter) {

            query.author = { $in: req.query.filter };
        }

        const books = await Book.find(query);
        res.status(200).json({ books });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports.getBookbyID = async (req, res) => {
    const id = req.params.id;
    try {

        const book = await Book.findById(id);
        if (!book) {
            return res.status(400).json({ msg: "Book not found" })
        }
        res.status(200).json({ msg: "Books fetched successfully", book: book })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error in finding the book or must be some server error" })
    }
}

module.exports.deletebook = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(400).json({ msg: "Book not found" })
        }
        await Book.findByIdAndDelete(id);
        res.status(200).json({ msg: "Book deleted successfully", book: book })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error in deleting the book or must be some server error" })
    }
}

module.exports.updatebook = async (req, res) => {
    const id = req.params.id;
    const { title, author, description, price, image } = req.body;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(400).json({ msg: "Book not found" })
        }
        const newbook = await Book.findByIdAndUpdate({
            title, author, description, price, image
        })
        res.status(200).json({ msg: "Book updated successfully", book: newbook })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error in updating the book or must be some server error" })

    }
}