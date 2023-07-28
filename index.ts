import express from 'express';
const app = express();
import { dbconn } from './connection';
import dotenv from 'dotenv';
import { User } from './models/user';
import { router } from './route/routes';
import {Address} from './models/address';
dotenv.config();

dbconn();
new User();
new Address();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user",router)
app.listen(process.env.PORT, async()=>{
    // dbconn();



    console.log(`server listing on ${process.env.PORT}`);

})


