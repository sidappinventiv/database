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
exports.logoutUser = exports.user_by_id = exports.getalluser = exports.signup = exports.loginuser = void 0;
const user_2 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcrypt_2 = require("bcrypt");
const create_token_1 = require("../middleware/create_token");
const session_1 = require("../models/session");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ioredis_1 = __importDefault(require("ioredis"));
const client = new ioredis_1.default({
    host: '192.168.2.153',
    port: 6379,
});
// const client = createClient();
// client.on('error', err => console.log('Redis Client Error', err));
// client.connect();
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
        const session1 = new session_1.Session({
            user_id: user.user_Id,
            status: "Active",
            expire_at: "1000"
        });
        // await session1.save(); 
        yield client.set(`${user.user_Id}_session`, JSON.stringify(user));
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
const user_by_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        const user = yield user_2.User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json({ success: true, user });
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching user profile.' });
    }
});
exports.user_by_id = user_by_id;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { authorization } = req.headers;
        console.log(authorization);
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token not provided' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, 'sdfukzsy');
        const user_id = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.user_Id;
        console.log("user_ID:", user_id);
        yield client.del(JSON.stringify(user_id));
        yield session_1.Session.destroy({ where: { id: user_id } });
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'An error occurred during logout' });
    }
});
exports.logoutUser = logoutUser;
// export const logoutUser = async (req: Request, res: Response) => {
//     const {authorization}=req.headers;
