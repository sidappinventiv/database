import { Request, Response, NextFunction,response} from 'express';
import { PathOrFileDescriptor, readFileSync } from 'fs';
import { Product } from '../models/product';
import { Image } from '../models/image';
import { User } from '../models/user';
import { Address } from '../models/address';
import fs from 'fs';
import multer from 'multer';
const storage = multer.memoryStorage(); 
const upload = multer({ storage });
console.log("7")

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



  export const imageUpload = async (req: Request, res: Response) => {
    try {
      console.log(req.files);
      const pid = req.query.pid;
      console.log(pid)
      const files = req.files as Express.Multer.File[]; 
      const bufferDataArray: Buffer[] = [];
      
      
      

      for (const file of files) {
        const fileData = fs.readFileSync(file.path);
        
        console.log(file.path);
        const bufferData = Buffer.from(fileData);
        console.log('filedata')
        bufferDataArray.push(bufferData);
        console.log(bufferData);
      }
  
      const images = await Image.create({ image: bufferDataArray, product_id: pid });
      console.log(images);
      res.status(201).json({ message: "Images registered successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

// export const imageUpload = async (req: Request, res: Response) => {
//   try {
    

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: 'No files uploaded.' });
//     }
// console.log("1")
//     const product_id  = 1;
// console.log(product_id)
//     if (!product_id) {
//       return res.status(400).json({ error: 'Product ID is required.' });
//     }
//     console.log("2")
//     const product = await Product.findOne({ where: { id: product_id } });

//     if (!product) {
//       return res.status(404).json({ error: 'Product not found.' });
//     }
//     console.log("3")
//     const imageBuffers: Buffer[] = [];

//     for (const file of req.files as Express.Multer.File[]) {
//       imageBuffers.push(file.buffer);
//     }

//     console.log("4")
//     Image.image= imageBuffers;
//     await product.save();

//     return res.status(200).json({ message: 'Files uploaded and saved to the database.', imageCount: imageBuffers.length });
//   } catch (error) {
//     console.error('Error uploading images:', error);
//     return res.status(500).json({ error: 'Internal server error.' });
//   }
// };


// export const uploadProductImages = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const productId = req.params.productid;
//     const image = req.file;
//     if (!image) {
//       return res.status(400).json({ error: 'Image file not found' });
//     }
//     const product = await Product.findByPk(productId);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     const imageRecord = await Image.create({
//       image: image.buffer,
//       product_id: productId,
//     });
//     res.json({ message: 'Image uploaded successfully', imageId: imageRecord.image_id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Failed to upload product images.' });
//   }
// };

// export const uploadProductImages = async(req:Request,res:Response,next:NextFunction) => {
//   try{
//     try {
//       const productId = req.params.productid;
//       const image = req.file
//       const product = await Product.findByPk(productId);
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
