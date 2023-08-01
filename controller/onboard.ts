import { Request, Response, NextFunction,response} from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import { compare } from 'bcrypt';
import { createToken } from '../middleware/create_token';
import { Session } from '../models/session';
import { createClient } from 'redis';
import session from 'express-session';
import jwt, { JwtPayload } from 'jsonwebtoken';
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
client.connect();


export const loginuser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const { username, password } = req.body;
     
        console.log("Username:", username);
        console.log("Password:", password);
      
        const user = await User.findOne({ where: { username: username } });
        console.log("User:", user);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const passwordMatch = await compare(password, user.password);
        console.log("Password Match:", passwordMatch);

        if (!passwordMatch) {
            throw new Error("Email and password do not match");
        }
       
        const session1 = new Session({
            user_id: user.user_Id,
            status: "Active",
            expire_at: "1000"
        });

        // await session1.save(); 
 await client.set(`${user.user_Id}_session`, JSON.stringify(user));

        const token = createToken(req);
     
        //   res.send({token:token})
        res.status(200).json({ message: 'Login successful',token});
    } catch (error) {
     
        console.error("Login Error:", error);
        res.status(500).json({ error: "An error occurred during login" });
    }
};


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username:username, email:email, password:password ,phone_number:phone_number,gender:gender} = req.body;
        
        const existingUser = await User.findOne({where:{email}});

        if (existingUser) {
            return res.status(409).json({ error: "Email already exists" });
        }
        const saltRounds = 8;
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user_1 = new User({ username, email, password: hashedPassword ,phone_number,gender});

        await user_1.save();
        res.status(201).json(user_1);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

export const getalluser = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const all = await User.findAll();
        res.status(200).json(all)
        
    }catch(err){
        console.log(err);
    }};

export const user_by_id= async(req:Request,res:Response)=>{
        try{
            const{user_id}=req.body;
            const user = await User.findByPk(user_id);
            if (!user) {
              return res.status(404).json({ error: 'User not found.' });
            }
            res.json({ success: true, user });
        } catch (error) {
          res.status(500).json({ error: 'Error fetching user profile.' });
        }
            
    
    }


    export const logoutUser = async (req: Request, res: Response) =>{

       try {
        const {authorization}=req.headers;
        console.log(authorization);
   
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token not provided' });
          }
        
        const decodedToken = <JwtPayload>jwt.verify(token, 'sdfukzsy');
        const user_id : number = decodedToken?.user_Id;
      
        console.log("user_ID:", user_id)
    
        await client.del(JSON.stringify(user_id));
        await Session.destroy({ where: { id: user_id } });
    
        res.status(200).json({ message: 'Logout successful' });
      } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'An error occurred during logout' });
      }
    };

// export const logoutUser = async (req: Request, res: Response) => {
//     const {authorization}=req.headers;
