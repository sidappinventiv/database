// src/models/Product.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connection';
import { Image } from './image';
enum Status{
    Active = 'active',
    NA = 'na',
  }
  
class Product extends Model{
   product_id!: number;
  product_name!:string;
   user_id!: number;
  bidding_amt!: number;
 bidder_id!: number | null;
   base_price!: number;
   description!: string;
  buyer_id!: number | null;
 address_id!: number;
status!: Status;
  created_at!: Date;
  updated_at!: Date;
}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bidding_amt: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bidder_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    base_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
        type: DataTypes.ENUM(Status.Active, Status.NA),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Product'
  });

  (async ()=>{
    await Product.sync({alter: true});
})();
Product.hasMany(Image, {
    foreignKey: 'product_id',
    as: 'images',
  });



export{Product}
