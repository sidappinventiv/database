import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('advertisement', 'postgres', '    ', {
  host: '192.168.2.153',
  dialect: 'postgres',
});

export const dbconn = async()=> {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// export default sequelize;