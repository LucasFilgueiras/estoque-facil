import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface TableDataType2 {
    name: string
    countentries: number
    countexits: number
}

export const TableReport2 = () => {
    
    const [tableData2, setTableData2] = useState<TableDataType2[]>([{
        name: "",
        countentries: 0,
        countexits: 0
    }])

    const handleTableData2 = async () => {
        const fetch = await api.get("/products/reports")
        const response = fetch.data
        setTableData2(response)
    }

    const columns2: GridColDef[] = [
        { field: 'name', headerName: 'Nome', width: 300 },
        { field: 'countentries', headerName: 'Entradas', width: 300 },
        { field: 'countexits', headerName: 'Saídas', width: 300 },
    ]

    const rows2: GridRowsProp = tableData2

    useEffect(() => {
        handleTableData2()
    }, [])

    return (
        <DataGrid className="bg-white mt-6" rows={rows2} columns={columns2} getRowId={row => row.name + row.countentries + row.countexits} />
    )
}