import { Request, Response, NextFunction,response} from 'express';
import { PathOrFileDescriptor, readFileSync } from 'fs';
import { Product } from '../models/product';
import { Image } from '../models/image';
import { User } from '../models/user';
import { Address } from '../models/address';
import multer from 'multer';
const storage = multer.memoryStorage(); 
const upload = multer({ storage });


export const addProductDetails= async(req: Request,res: Response) => {
  try {
    const {user_id,product_name,description,bidding_amt,base_price} = req.body;

    if (!product_name || !user_id) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }



    const productData = new Product({ user_id,
      product_name,
      description,
      bidding_amt,
      base_price,
    });
  const product = await productData.save();
    res.json({ message: "Product details added successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add product details: " });
  }
}

export const uploadProductImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.productid;
    const image = req.file;
    if (!image) {
      return res.status(400).json({ error: 'Image file not found' });
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const imageRecord = await Image.create({
      image: image.buffer,
      product_id: productId,
    });
    res.json({ message: 'Image uploaded successfully', imageId: imageRecord.image_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to upload product images.' });
  }
};

// export const uploadProductImages = async(req:Request,res:Response,next:NextFunction) => {
//   try{
//     try {
//       const productId = req.params.productid;
//       const image = req.file
//       const product = await Product.findByPk(productId);
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
