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
exports.uploadProductImages = exports.addProductDetails = void 0;
const product_1 = require("../models/product");
const image_1 = require("../models/image");
const user_1 = require("../models/user");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const addProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, product_name, description, bidding_amt, base_price } = req.body;
        if (!product_name || !user_id) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        const user = yield user_1.User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const productData = new product_1.Product({ user_id,
            product_name,
            description,
            bidding_amt,
            base_price,
        });
        const product = yield productData.save();
        res.json({ message: "Product details added successfully", product });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to add product details: " });
    }
});
exports.addProductDetails = addProductDetails;
const uploadProductImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productid;
        const image = req.file;
        if (!image) {
            return res.status(400).json({ error: 'Image file not found' });
        }
        const product = yield product_1.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const imageRecord = yield image_1.Image.create({
            image: image.buffer,
            product_id: productId,
        });
        res.json({ message: 'Image uploaded successfully', imageId: imageRecord.image_id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to upload product images.' });
    }
});
exports.uploadProductImages = uploadProductImages;
// export const uploadProductImages = async(req:Request,res:Response,next:NextFunction) => {
//   try{
//     try {
//       const productId = req.params.productid;
//       const image = req.file
//       const product = await Product.findByPk(productId);
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
