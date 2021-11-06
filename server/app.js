const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { AuthStringToMongo } = require('./pass');

const app = express();

// to connect to mongodb with https://cloud.mongodb.com/
mongoose.connect(`mongodb+srv://${AuthStringToMongo}@cluster0.o2rlb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
mongoose.connection.once('open', () => {
	console.log('connected to database')
});

// to react for all requests with graphql
app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log('requests port 4000');
});