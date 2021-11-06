const graphQL = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const {
	GraphQLString,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} = graphQL;

// const tempBooks = [
// 	{ name: 'Wizards', genre: 'fantasy', id: '1', authorID: '1' },
// 	{ name: 'Animals', genre: 'cognitive', id: '2', authorID: '2' },
// 	{ name: 'Birds', genre: 'cognitive', id: '3', authorID: '2' }
// ];
//
// const authors = [
// 	{ name: 'Daniel Kiz', age: 43, id: '1' },
// 	{ name: 'Robert Shown leonard', age: 33, id: '2' }
// ];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// return authors.find(({ id }) => id === parent.authorID);
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
			resolve(parent, args) {
				// code to get data from db / other source
				console.log(parent)
				// return tempBooks.filter(({ authorID }) => authorID === parent.id);
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
				// code to get data from db / other source

				// return tempBooks.find(({ id }) => id === args.id);
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db / other source

				// return authors.find(({ id }) => id === args.id);
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// code to get data from db / other source

				// return tempBooks
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				// code to get data from db / other source

				// return authors
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: {
					type: GraphQLString,
				},
				age: {
					type: GraphQLString,
				}
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age,
				});

				return author.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});