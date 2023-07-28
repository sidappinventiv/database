import { Request, Response, NextFunction,response} from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import { compare } from 'bcrypt';
import { createToken } from '../middleware/create_token';


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