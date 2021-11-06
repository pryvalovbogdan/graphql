const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { AuthStringToMongo } = require('./pass');

const app = express();

mongoose.connect(`mongodb+srv://${AuthStringToMongo}@cluster0.o2rlb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
mongoose.connection.once('open', () => {
	console.log('connnected to database')
});

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log('requests port 4000');
});