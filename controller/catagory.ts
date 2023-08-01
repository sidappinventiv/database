import { Request, Response }  from "express";
import { Category } from "../models/catagory";
export const category_add= async (req:Request,res:Response)=>{
    const {category_name,subcategories}=req.body;
    await Category.create({
        category_name,
        subcategories,
    })
    res.json("category added")
}