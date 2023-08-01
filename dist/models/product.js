"use strict";
// src/models/Product.ts
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
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
const image_1 = require("./image");
var Status;
(function (Status) {
    Status["Active"] = "active";
    Status["NA"] = "na";
})(Status || (Status = {}));
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    bidding_amt: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    bidder_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    base_price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    buyer_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    address_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(Status.Active, Status.NA),
        allowNull: true,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: connection_1.sequelize,
    modelName: 'Product'
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Product.sync({ alter: true });
}))();
Product.hasMany(image_1.Image, {
    foreignKey: 'product_id',
    as: 'images',
});
