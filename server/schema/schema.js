const graphQL = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const {
	GraphQLString,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
} = graphQL;

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent) {
				// to get exact author by id from client

				return Author.findById(parent.authorID);
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent) {
				// to get exact books by author from client

				return Book.find({
					authorID: parent.id,
				})
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// to get exact book with id from client

				return Book.findById(args.id)
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// to get exact author with id from client

				return Author.findById(args.id)
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// to return all books

				return Book.find({})
			}
		},
		authors: {
			// GraphQLList - array of
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				// to return all authors

				return Author.find({})
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			// to add author from client
			type: AuthorType,
			args: {
				name: {
					// GraphQLNonNull to say that field is required
					type: new GraphQLNonNull(GraphQLString),
				},
				age: {
					type: new GraphQLNonNull(GraphQLString),
				}
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age,
				});
				// to return result what was added into db
				return author.save();
			}
		},
		addBook: {
			// to add author from client
			type: BookType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString),
				},
				genre: {
					type: new GraphQLNonNull(GraphQLString),
				},
				authorID: {
					type: GraphQLID
				},
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorID: args.authorID
				});
				// to return result what was added into db
				return book.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});