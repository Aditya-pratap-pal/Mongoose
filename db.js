import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// const objectId = mongoose.ObjectId;
// Schema.Types.ObjectId

// const user = new Schema({
//     name: String,
//     email: String,
//     password: String
// })

// const todo = new Schema({
//     title: String,
//     done: Boolean,
//     userId: objectId
// })
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const todoSchema = new Schema({
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true }
}, { timestamps: true });

export const UserModel = mongoose.model('User', userSchema);
export const TodoModel = mongoose.model('Todo', todoSchema);


