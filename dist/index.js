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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const connection_1 = require("./connection");
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./route/routes");
dotenv_1.default.config();
const ioredis_1 = require("ioredis");
const redisClient = ioredis_1.Redis.createClient();
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API FOR MONGODB',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000/'
            }
        ]
    },
    apis: ['./routes/onboard.ts']
};
(0, connection_1.dbconn)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", routes_1.router);
app.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    // dbconn();
    console.log(`server listing on ${process.env.PORT}`);
}));
