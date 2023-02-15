import { Request, Response } from "express"
import { db } from "../db/connection"

export const productsInStorage = async (req: Request, res: Response) => {
    try {
        const sql: string = "SELECT COUNT(*) AS productsStorage, SUM(amount) AS productsAmountStorage, SUM(price) AS productsPriceStorage FROM products"
        const query = await db.query(sql)
        return res.status(200).json(query.rows)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const productsInStorageChart = async (req: Request, res: Response) => {
    try {
        const sql: string = "SELECT name, amount, CAST(price AS integer) FROM products"
        const query = await db.query(sql)
        return res.status(200).json(query.rows)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}