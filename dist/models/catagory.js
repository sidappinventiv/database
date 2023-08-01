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
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
class Category extends sequelize_1.Model {
}
exports.Category = Category;
Category.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subcategories: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    image: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: true,
    },
}, {
    sequelize: connection_1.sequelize,
    modelName: 'Category',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Category.sync({ alter: true });
}))();
