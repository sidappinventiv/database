
import { Request, Response } from 'express';
import { Address } from '../models/address';

export const createaddress = async (req: Request, res: Response) => {
  try {
    const {address_line1,address_line2,landmark,city,state,address_type,user_id,zip_code,country,
    } = req.body;

    if (!address_line1 || !city || !state || !address_type || !user_id || !zip_code || !country) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const address = await Address.create({address_line1,address_line2,landmark,city,state,address_type,user_id,zip_code,country,status: true,
    });

    res.json({ message: 'Address created successfully', address });
  } catch (error) {
    console.error('Create Address Error:', error);
    res.status(500).json({ error: 'Failed to create address' });
  }
};

export const updateaddress = async (req: Request, res: Response) => {
    try {
      const addressId = req.params.addressId;
      const {address_line1,address_line2,landmark,city,state,address_type,user_id,zip_code,country,
      } = req.body;
      if (!address_line1 || !city || !state || !address_type || !user_id || !zip_code || !country) {
        return res.status(400).json({ error: 'missing requiredfields' });
      }
      const address = await Address.findByPk(addressId);
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
      await address.save();
  
      res.json({ message: 'adress updated suscessfull', address });
    } catch (error) {
      console.error('update err adress:', error);
      res.status(500).json({ error: 'failed to update addres' });
    }
  };
  



  export const deleteaddress = async (req: Request, res: Response) => {
    try {
      const addressId = req.params.addressId;
      const address = await Address.findByPk(addressId);
      if (!address) {
        return res.status(404).json({ error: 'address not found' });
      }
      await address.destroy();
      res.json({ message: 'sddress deleted successfully' });
    } catch (error) {
      console.error('delete Address err:', error);
      res.status(500).json({ error: 'failed to delete address' });
    }
  };
  