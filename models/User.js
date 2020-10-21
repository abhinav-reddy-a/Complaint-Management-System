const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId:String
});

const adminSchema = new Schema({
	googleId:String
});

const secySchema = new Schema({
	googleId:String
});

mongoose.model("users",userSchema);
mongoose.model("admins",adminSchema);
mongoose.model("secies",secySchema);