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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
const user_1 = require("./user");
var Status;
(function (Status) {
    Status["Active"] = "active";
    Status["NA"] = "na";
})(Status || (Status = {}));
class Session extends sequelize_1.Model {
}
exports.Session = Session;
Session.init({
    session_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_Id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.User,
            key: 'user_Id',
        },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(Status.Active, Status.NA),
    },
    user_token: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: connection_1.sequelize,
    modelName: 'Session',
});
Session.belongsTo(user_1.User, {
    foreignKey: 'user_Id',
    as: 'user',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Session.sync({ alter: true });
}))();
