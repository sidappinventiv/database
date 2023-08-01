import { DataTypes, Model } from 'sequelize';
import Sequelize from 'sequelize';
import { sequelize } from '../connection';
import { User } from './user';
enum Status{
    Active = 'active',
    NA = 'na',
  }

class Session extends Model {
    session_id!:number;
   user_id!: Number;
   status!: Status;
   user_token!:string;
}

Session.init(
  {
    session_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement : true,
    },
    user_Id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'user_Id',
      },
    },
    status: {
      type: DataTypes.ENUM(Status.Active,Status.NA),
    },
    user_token:{
      type:DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Session',
  
  }
);

Session.belongsTo(User, {
  foreignKey: 'user_Id',
  as: 'user',
});
(async ()=>{
    await Session.sync({alter: true});
})();
// Session.sync();
export {Session};