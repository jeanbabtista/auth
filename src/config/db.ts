import { connect as _connect } from 'mongoose'
import { config } from 'dotenv'

config()

const url = (process.env.NODE_ENV === 'production' ? process.env.DB_URL_PROD : process.env.DB_URL) || ''

const db = {
    url,
    connect: async function () {
        try {
            await _connect(url)
            console.log('Successfully connected to database')
        } catch (e: any) {
            console.log('Error connecting to database:', e.message)
        }
    }
}

export default db
