

import {Model,DataTypes} from 'sequelize';
import { sequelize } from '../connection';
import { User } from './user';

class Address extends Model {
      address_id!:number;
       address_line1!:String;
       address_line2!:String;
       landmark!:String;
       city!:String;
       state!:String;
       address_type!: 'Home'|'Work'|'Others';
       user_id!:Number;
       zip_code!:Number;
       country!:String;
       status!: Boolean;
    }

    Address.init(
        {
          address_id:{
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
          address_line1: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          address_line2: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          landmark: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          city: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          state: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          address_type: {
            type: DataTypes.ENUM('Home', 'Work', 'Others'),
            allowNull: false,
          },
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          zip_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          country: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },
        },
        {
          sequelize,
          modelName: 'Address', 
     
        }
      );
      (async ()=>{
        await Address.sync({alter: true});
    })();
    
    
    Address.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user', 
      });
    
export {Address};

