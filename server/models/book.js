const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
	name: String,
	genre: String,
	authorID: String
});

module.exports = model('Book', bookSchema);
