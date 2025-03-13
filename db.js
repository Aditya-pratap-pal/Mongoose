const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.ObjectId;
const mongoId = 'mongodb+srv://Aditya:mongoDb@098@cluster0.xoim4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const user = new Schema({
    name: string,
    email: string,
    password: string
})

const todo = new Schema({
    title: string,
    done: boolean,
    userId: objectId
})

const usermodel = mongoose.model('users',user);
const todomodel = mongoose.model('todos',todo);
