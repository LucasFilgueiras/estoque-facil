import { Pool } from "pg"
import * as dotenv from "dotenv";
dotenv.config()

const dbPort = parseInt(process.env.DB_PORT as string)

export const db = new Pool ({
    port: dbPort,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
})