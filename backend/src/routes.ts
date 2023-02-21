import { addProducts, createProducts, deleteProducts, getProducts, removeProducts } from "./controllers/productsController"
import { Router } from "express"
import { productsInStorage, productsInStorageChart } from "./controllers/dashboardController"
import { getLogProducts } from "./controllers/logController"
import { countEntriesExit } from "./controllers/reportsController"

const route: Router = Router()

// Routes for productsController
route.get("/products", getProducts)
route.post("/products", createProducts)
route.put("/products/remove/:id", removeProducts)
route.put("/products/add/:id", addProducts)
route.delete("/products/:id", deleteProducts)

// Routes for dashboardController
route.get("/dashboard/products_storage", productsInStorage)
route.get("/dashboard/products_chart", productsInStorageChart)

// Route for catch the log data
route.get("/products/log", getLogProducts)

// Routes for reportsController
route.get("/products/reports", countEntriesExit)


export default route