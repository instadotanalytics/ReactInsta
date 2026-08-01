import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const plainPassword = process.env.ADMIN_PASSWORD;
const saltRounds = 10;
const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

export const ADMIN = {
  username: process.env.ADMIN_USERNAME,
  password: hashedPassword
};