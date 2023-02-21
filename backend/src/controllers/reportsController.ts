import { Request, Response } from "express"
import { db } from "../db/connection"

export const countEntriesExit = async (req: Request, res: Response) => {
    try {
        const sql: string = "SELECT p.name, COUNT(ent.id) AS countEntries, COUNT(ext.id) AS countExits FROM products_entries ent LEFT JOIN products_exits ext ON ent.id_product=ext.id_product INNER JOIN products p ON ent.id_product=p.id GROUP BY p.name"
        const query = await db.query(sql)
        res.status(200).json(query.rows)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}