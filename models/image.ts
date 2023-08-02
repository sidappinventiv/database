// src/models/Image.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connection';
import { Product } from './product';
import { User } from './user';


class Image extends Model{
  public image_id!: number;
  public image!: Buffer;
  public created_at!: Date;
  public updated_at!: Date;
  public product_id!: number;
  static image: Buffer[];
}

Image.init(
  {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'product_id'
      }

    },
  },
  {
    sequelize,
    modelName: 'Image',
  }
);(async ()=>{
  await Image.sync({alter: true});
})();
// Image.belongsTo(Product, {
//   foreignKey: 'product_id',
//   as: 'product',
// });

export {Image};
