const express = require('express');
const Book = require('../models/Book');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

router.get('/', async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const query = {};
  if (author) query.author = author;
  if (genre) query.genre = genre;

  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(books);
});

router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  const reviews = await Review.find({ book: book._id }).populate('user');
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0;

  res.json({ book, averageRating: avgRating.toFixed(2), reviews });
});

module.exports = router;
