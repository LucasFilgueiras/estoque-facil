import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { Actions } from "../components/Actions"
import { Dashboard } from "../components/Dashboard"
import { Reports } from "../components/Reports"

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route index element={<Dashboard />} />
                    <Route path="acoes" element={<Actions />} />
                    <Route path="relatorios" element={<Reports />} />
                    <Route path="*" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}