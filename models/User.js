const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId:String,
	username:String
});

mongoose.model("users",userSchema);