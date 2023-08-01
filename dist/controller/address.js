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
exports.deleteaddress = exports.updateaddress = exports.createaddress = void 0;
const address_1 = require("../models/address");
const createaddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address_line1, address_line2, landmark, city, state, address_type, user_id, zip_code, country, } = req.body;
        if (!address_line1 || !city || !state || !address_type || !user_id || !zip_code || !country) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const address = yield address_1.Address.create({ address_line1, address_line2, landmark, city, state, address_type, user_id, zip_code, country, status: true,
        });
        res.json({ message: 'Address created successfully', address });
    }
    catch (error) {
        console.error('Create Address Error:', error);
        res.status(500).json({ error: 'Failed to create address' });
    }
});
exports.createaddress = createaddress;
const updateaddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addressId = req.params.addressId;
        const { address_line1, address_line2, landmark, city, state, address_type, user_id, zip_code, country, } = req.body;
        if (!address_line1 || !city || !state || !address_type || !user_id || !zip_code || !country) {
            return res.status(400).json({ error: 'missing requiredfields' });
        }
        const address = yield address_1.Address.findByPk(addressId);
        if (!address) {
            return res.status(404).json({ error: 'address not found' });
        }
        address.address_line1 = address_line1;
        address.address_line2 = address_line2;
        address.landmark = landmark;
        address.city = city;
        address.state = state;
        address.address_type = address_type;
        address.user_id = user_id;
        address.zip_code = zip_code;
        address.country = country;
        yield address.save();
        res.json({ message: 'adress updated suscessfull', address });
    }
    catch (error) {
        console.error('update err adress:', error);
        res.status(500).json({ error: 'failed to update addres' });
    }
});
exports.updateaddress = updateaddress;
const deleteaddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addressId = req.params.addressId;
        const address = yield address_1.Address.findByPk(addressId);
        if (!address) {
            return res.status(404).json({ error: 'address not found' });
        }
        yield address.destroy();
        res.json({ message: 'sddress deleted successfully' });
    }
    catch (error) {
        console.error('delete Address err:', error);
        res.status(500).json({ error: 'failed to delete address' });
    }
});
exports.deleteaddress = deleteaddress;
