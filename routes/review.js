const express = require('express');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/books/:id/reviews', auth, async (req, res) => {
  const existing = await Review.findOne({ book: req.params.id, user: req.user._id });
  if (existing) return res.status(400).json({ message: 'Already reviewed' });

  const review = new Review({ ...req.body, book: req.params.id, user: req.user._id });
  await review.save();
  res.status(201).json(review);
});

router.put('/reviews/:id', auth, async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || !review.user.equals(req.user._id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  Object.assign(review, req.body);
  await review.save();
  res.json(review);
});

router.delete('/reviews/:id', auth, async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || !review.user.equals(req.user._id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await review.deleteOne(); // ✅ Correct

  res.json({ message: 'Review deleted' });
});

module.exports = router;
