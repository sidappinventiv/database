"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getalluser = exports.signup = exports.loginuser = void 0;
const user_2 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcrypt_2 = require("bcrypt");
const create_token_1 = require("../middleware/create_token");
const loginuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        console.log("Username:", username);
        console.log("Password:", password);
        const user = yield user_2.User.findOne({ where: { username: username } });
        console.log("User:", user);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const passwordMatch = yield (0, bcrypt_2.compare)(password, user.password);
        console.log("Password Match:", passwordMatch);
        if (!passwordMatch) {
            throw new Error("Email and password do not match");
        }
        const token = (0, create_token_1.createToken)(req);
        //   res.send({token:token})
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "An error occurred during login" });
    }
});
exports.loginuser = loginuser;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username: username, email: email, password: password, phone_number: phone_number, gender: gender } = req.body;
        const existingUser = yield user_2.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "Email already exists" });
        }
        const saltRounds = 8;
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user_1 = new user_2.User({ username, email, password: hashedPassword, phone_number, gender });
        yield user_1.save();
        res.status(201).json(user_1);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});
exports.signup = signup;
const getalluser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield user_2.User.findAll();
        res.status(200).json(all);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getalluser = getalluser;
