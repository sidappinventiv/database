import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../connection';
class User extends Model{
    user_Id!: number;
    username!: String;
    email! : string;
    password!: string;
    status! : boolean;
    phone_number! : BigInt;
    gender! : string;
    createdAt! : Date;
    updatedAt! : Date;
    }

User.init({
    user_Id:{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    username:{
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    email:{
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password:{
        type : DataTypes.STRING,
        allowNull : false
    },
    status:{
        type: DataTypes.BOOLEAN,
       
        defaultValue: true
    },
    phone_number:{
        type:DataTypes.BIGINT,
        allowNull : false
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue: Date.now(),
        allowNull: false
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue: Date.now(),
        allowNull: false
    },
},
{
    sequelize,
    modelName:'users'
});
(async ()=>{
    await User.sync({alter: true});
})();



export{User}