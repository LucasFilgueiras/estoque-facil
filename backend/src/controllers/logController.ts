import { Request, Response } from "express"
import { db } from "../db/connection"

export const getLogProducts = async (req: Request, res: Response) => {
    try {
        const sql: string = "SELECT * FROM products_log"
        const query = await db.query(sql)
        return res.status(200).json(query.rows)
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}