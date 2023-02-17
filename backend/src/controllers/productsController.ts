import { Request, Response } from "express"
import { db } from "../db/connection"

export const getProducts = async (req: Request, res: Response) => {
    try {
        const sql: string = "SELECT * FROM products"
        const query = await db.query(sql)
        return res.status(200).json(query.rows)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const createProducts = async (req: Request, res: Response) => {
    const date = new Date()
    const dbDate = date.toLocaleDateString()

    const {name, description, producer, price} = req.body

    interface ValuesType {
        name: string
        description?: string
        producer?: string
        price?: number
    }

    try {
        const sql: string = "INSERT INTO products (name, description, producer, price, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *"
        const values: ValuesType[] = [name, description, producer, price, dbDate]
        const query = await db.query(sql, values)
        return res.status(201).json(query.rows)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const removeProducts = async (req: Request, res: Response) => {
    const {id} = req.params
    const {amount} = req.body

    const date = new Date()
    const dbDate = date.toLocaleDateString()

    try {
        const sql: string = "UPDATE products SET updated_at = $1, amount = amount - $2 WHERE id=$3 RETURNING *"
        const sqlLog: string = "INSERT INTO products_log(name, type, date) VALUES ((SELECT name FROM products WHERE id=$1), 0, $2) RETURNING *"
        const values = [dbDate, amount, id]
        const valuesLog = [id, dbDate]
        const query = await db.query(sql, values)
        const queryLog = await db.query(sqlLog, valuesLog)
        return res.status(200).json({
            query: query.rows,
            queryLog: queryLog.rows
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const addProducts = async (req: Request, res: Response) => {
    const {id} = req.params
    const {amount} = req.body

    const date = new Date()
    const dbDate = date.toLocaleDateString()

    try {
        const sql: string = "UPDATE products SET updated_at = $1, amount = amount + $2 WHERE id=$3 RETURNING *"
        const sqlLog: string = "INSERT INTO products_log(name, type, date) VALUES ((SELECT name FROM products WHERE id=$1), 1, $2) RETURNING *"
        const values = [dbDate, amount, id]
        const valuesLog = [id, dbDate]
        const query = await db.query(sql, values)
        const queryLog = await db.query(sqlLog, valuesLog)
        return res.status(200).json({
            query: query.rows,
            queryLog: queryLog.rows
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const deleteProducts = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const sql: string = "DELETE FROM products WHERE id=$1 RETURNING *"
        const values = [id]
        const query = await db.query(sql, values)
        return res.status(200).json(query.rows)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}