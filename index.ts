import express from 'express';
const app = express();
import { dbconn } from './connection';
import dotenv from 'dotenv';

import { router } from './route/routes';

dotenv.config();
import { Redis } from 'ioredis';
import connectRedis from 'connect-redis'



const redisClient = Redis.createClient();
const options ={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'API FOR MONGODB',
            version:'1.0.0'
        },
        servers:[
            {
                url : 'http://localhost:3000/'
            }
        ]
    },
    apis:['./routes/onboard.ts']
}

dbconn();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api",router)
app.listen(process.env.PORT, async()=>{
    // dbconn();



    console.log(`server listing on ${process.env.PORT}`);

})


