import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { api } from '../lib/axios';

interface TableDataType {
    id: number
    name: string
    description: string
    producer?: string
    amount: number
    price?: number
}

export const TableReports = () => {
    const [tableData, setTableData] = useState<TableDataType[]>([{
        id: 0,
        name: "",
        description: "",
        producer: "",
        amount: 0,
        price: 0
    }])

    const handleTableData = async () => {
        const fetch = await api.get("/products")
        const response = fetch.data
        setTableData(response)
    }

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nome', width: 160 },
        { field: 'description', headerName: 'Descrição', width: 250 },
        { field: 'producer', headerName: 'Fabricante', width: 250 },
        { field: 'amount', headerName: 'Quantidade', width: 160 },
        { field: 'price', headerName: 'Preço', width: 160 },
    ]

    const rows: GridRowsProp = tableData

    useEffect(() => {
        handleTableData()
        console.log(tableData)
    }, [])

    return (
        <DataGrid className="bg-white mt-6" rows={rows} columns={columns} />
    )
}