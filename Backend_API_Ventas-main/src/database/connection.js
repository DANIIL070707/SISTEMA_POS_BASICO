import sql from "mssql";
import dotenv from 'dotenv';

dotenv.config();
const dbSetting = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    console.log('USER:', process.env.USER);
    console.log('PASSWORD:', process.env.PASSWORD);
    console.log('SERVER:', process.env.SERVER);
    console.log('DATABASE:', process.env.DATABASE);
    const pool = await sql.connect(dbSetting);
    return pool;
  } catch (error) {
    console.log(error);
  }
}


