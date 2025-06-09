import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'your_app_name',
  username: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  dialect: 'mysql',
  logging: false, 
});

export default sequelize;