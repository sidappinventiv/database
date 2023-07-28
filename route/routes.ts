import express from 'express';
import { getalluser } from '../controller/onboard';
import { signup } from '../controller/onboard';
import { loginuser } from '../controller/onboard';
import { verifyToken } from '../middleware/verify_token';


const router = express.Router();
const app = express();
app.use(router);

router.get("/getalluser",getalluser);

router.post("/signup",signup);

router.post('/login',loginuser);

export{router}