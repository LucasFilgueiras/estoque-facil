import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { api } from '../lib/axios';

interface TableDataType1 {
    id: number
    name: string
    description: string
    producer?: string
    amount: number
    price?: number
}

export const TableReport1 = () => {

    const [tableData1, setTableData1] = useState<TableDataType1[]>([{
        id: 0,
        name: "",
        description: "",
        producer: "",
        amount: 0,
        price: 0
    }])

    const handleTableData1 = async () => {
        const fetch = await api.get("/products")
        const response = fetch.data
        setTableData1(response)
    }


    const columns1: GridColDef[] = [
        { field: 'name', headerName: 'Nome', width: 160 },
        { field: 'description', headerName: 'Descrição', width: 250 },
        { field: 'producer', headerName: 'Fabricante', width: 250 },
        { field: 'amount', headerName: 'Quantidade', width: 160 },
        { field: 'price', headerName: 'Preço', width: 160 },
    ]

    const rows1: GridRowsProp = tableData1

    useEffect(() => {
        handleTableData1()
        //console.log(tableData2)
    }, [])

    return (
        <DataGrid className="bg-white mt-6" rows={rows1} columns={columns1} />
    )
}