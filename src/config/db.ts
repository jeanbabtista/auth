import { connect as mongooseConnect } from 'mongoose';
import { config } from 'dotenv';

config();

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/test';

const db = {
    url: DB_URL,
    connect: async function () {
        try {
            await mongooseConnect(DB_URL);
            console.log('Successfully connected to database');
        } catch (e: any) {
            console.log('Error:', e.message);
        }
    }
};

export default db;