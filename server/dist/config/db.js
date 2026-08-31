"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUrl = process.env.MONGO_URI;
if (!mongoUrl) {
    console.error('MongoDB connection string is not defined in the environment variables.');
}
else {
    mongoose_1.default
        .connect(mongoUrl)
        .then(() => {
        console.log('Connected to MongoDB successfully.');
    })
        .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}
