import { addProducts, createProducts, deleteProducts, getProducts, removeProducts } from "./controllers/productsController"
import { Router } from "express"
import { productsInStorage, productsInStorageChart } from "./controllers/dashboardController"

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

export default route