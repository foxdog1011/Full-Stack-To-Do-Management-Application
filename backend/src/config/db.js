const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async function connectDB() {
	if (process.env.NODE_ENV === 'test') {
	const mem = await MongoMemoryServer.create();
	return mongoose.connect(mem.getUrl());
	}

	const uri = 
	process.env.NODE_ENV ==='production'
		?process.env.DB_URI_PROD
		:process.env.DB_URI_DEV || 'mongodb://localhost:27017/todo-app'l
	return mongoose.connect(uri);
};