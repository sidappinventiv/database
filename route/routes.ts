import express from 'express';
import { verifyToken } from '../middleware/verify_token';
import { user_by_id ,loginuser,logoutUser,signup,getalluser} from '../controller/onboard';
import { imageUpload,addProductDetails} from '../controller/product_c';
import { category_add } from '../controller/catagory';
import {createaddress, updateaddress ,deleteaddress} from '../controller/address';
import multer from 'multer';

import { upload } from '../middleware/multer';



const router = express.Router();

const app = express();
app.use(router);
router.post('/imageUpload/', upload.array('image', 5), imageUpload);
router.post('/createaddress',createaddress)
router.post("/addProductDetails",verifyToken,addProductDetails);
router.get("/getalluser",getalluser);
router.get("/getuserbyid",user_by_id);
router.post("/signup",signup);
router.delete("/logout",logoutUser)
router.post('/login',loginuser);
router.put('/updateaddress',verifyToken,updateaddress);
router.delete('/deleteaddress',verifyToken,deleteaddress);
router.post('/addcatagory',category_add)

export{router}