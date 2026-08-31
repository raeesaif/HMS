"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("colors");
const app_1 = __importDefault(require("./app"));
require("./config/db");
const port = Number(process.env.PORT) || 5000;
app_1.default.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`.bgCyan.black);
});
