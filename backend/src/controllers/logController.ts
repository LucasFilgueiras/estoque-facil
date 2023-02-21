import { Request, Response } from "express"
import { db } from "../db/connection"

export const getLogProducts = async (req: Request, res: Response) => {
    try {
        const sqlEntries: string = "SELECT * FROM products_entries ORDER BY id DESC"
        const sqlExits: string = "SELECT * FROM products_exits ORDER BY id DESC"
        const queryEntries = await db.query(sqlEntries)
        const queryExits = await db.query(sqlExits)
        return res.status(200).json({
            entries: queryEntries.rows,
            exits: queryExits.rows
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}