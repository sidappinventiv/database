"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const onboard_1 = require("../controller/onboard");
const onboard_2 = require("../controller/onboard");
const onboard_3 = require("../controller/onboard");
const router = express_1.default.Router();
exports.router = router;
const app = (0, express_1.default)();
app.use(router);
router.get("/getalluser", onboard_1.getalluser);
router.post("/signup", onboard_2.signup);
router.post('/login', onboard_3.loginuser);
