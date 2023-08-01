import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize,dbconn } from '../connection';

class Category extends Model {
  id!: number;
  category_name!: string;
  subcatagory_id!:string
  subcategories!: string;
  createdAt!: Date;
  updatedAt!: Date;
  image!: Buffer;
 }
 Category.init(
        {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            category_name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            subcategories: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            createdAt: {
              type: DataTypes.DATE,
              allowNull: false,
              defaultValue: DataTypes.NOW,
            },
            updatedAt: {
              type: DataTypes.DATE,
              allowNull: false,
              defaultValue: DataTypes.NOW,
            },
            image: {
              type: DataTypes.BLOB,
              allowNull: true,
            },
    },
    {
      sequelize,
      modelName: 'Category', 
 
    }
  );
  (async ()=>{
    await Category.sync({alter: true});
})();
export {Category};