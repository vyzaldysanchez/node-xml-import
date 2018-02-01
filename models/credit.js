'use strict';

const mongoose = require('mongoose');

const Credit = new mongoose.Schema({
  fullName: { type: String, required: true },
  cardId: { type: String, required: true },
  career: { type: String, required: true },
  creditAmount: { type: Number, required: true }
});

module.exports = mongoose.model('credit', Credit);

