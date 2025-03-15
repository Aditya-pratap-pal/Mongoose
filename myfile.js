import express from 'express';
import mongoose from 'mongoose';
const app = express();
app.use(express.json());

import { UserModel, TodoModel } from "./db.js";

//  Fixed MongoDB Connection (Ensure DB name is included)
mongoose.connect('mongodb+srv://Aditya:mongoDb098@cluster0.xoim4.mongodb.net/myDatabase', {
    tls: true,
    tlsAllowInvalidCertificates: false, // Only set to true if debugging
})
.then(() => console.log('MongoDB Connected Successfully 🚀'))
.catch(err => console.error('MongoDB Connection Error:', err));

// User Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { email, name, password } = req.body;

        if (!email || !name || !password) { // Check for missing fields
            return res.status(400).json({ message: "All fields are required!" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const newUser = await UserModel.create({ email, name, password });

        res.status(201).json({ message: "User registered successfully ", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

//  User Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) { //  Check for missing fields
            return res.status(400).json({ message: "Email and password are required!" });
        }

        const user = await UserModel.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password ❌" });
        }

        // Placeholder for JWT token generation
        const token = "dummy_token"; // Replace with actual JWT implementation

        res.json({ message: "Login successful ", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

//  Create a new Todo
app.post("/todo", async (req, res) => {
    try {
        const { title, userId } = req.body;

        if (!title || !userId) {
            return res.status(400).json({ message: "Title and userId are required!" });
        }

        const newTodo = await TodoModel.create({ title, done: false, userId });

        res.status(201).json({ message: "Todo created successfully ", todo: newTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

//  Get all Todos
app.get("/todo", async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.json({ todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

//  Server Listening
app.listen(8000, () => {
    console.log("Server running on port 8000 🚀");
});
