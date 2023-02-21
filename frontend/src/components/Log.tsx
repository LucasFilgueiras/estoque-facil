import * as Popover from '@radix-ui/react-popover'
import { useEffect, useState } from 'react'
import { FaBell } from "react-icons/fa"
import { api } from '../lib/axios'

interface LogDataType {
    id: number
    name: string
    date: Date
    id_product: number
}

export const Log = () => {

    const [logDataEntries, setLogDataEntries] = useState<LogDataType[]>([])
    const [logDataExits, setLogDataExits] = useState<LogDataType[]>([])

    const handleLogDataEntries = async () => {
        const fetch = await api.get("/products/log")
        const response = fetch.data
        setLogDataEntries(response.entries)
    }

    const handleLogDataExits = async () => {
        const fetch = await api.get("/products/log")
        const response = fetch.data
        setLogDataExits(response.exits)
    }

    const handleVerifyLog = () => {
        if (logDataEntries.length === 0 && logDataExits.length === 0 ) {
            return (
                <span><u><strong>Não há dados pra log.</strong></u></span>
            )
        }
    }

    const formatDate = (date: Date) => {
        const createDate = new Date(date)
        return createDate.toLocaleDateString()
    }

    useEffect(() => {
        handleLogDataEntries()
        handleLogDataExits()
        console.log(logDataExits)        
    }, [])
    
    return (
        <Popover.Root>
            <Popover.Trigger>
                <FaBell size={20} className="hover:cursor-pointer transition-transform duration-300 hover:scale-125" />
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className='bg-white shadow-2xl p-4 rounded-lg' side='bottom' align='end'>
                    {logDataEntries.length !== 0 && logDataEntries.map(logData => (
                        <div 
                            key={logData.id}
                            className="p-2 mt-2"
                        >
                            <span className='p-2 rounded-md'>
                                <strong><u>Foi realizada uma entrada do produto {logData.name} na data {formatDate(logData.date)}</u></strong>
                            </span>
                        </div>
                    ))}

                    {logDataExits.length !== 0 && logDataExits.map(logData => (
                        <div 
                            key={logData.id}
                            className="p-2 mt-2"
                        >
                            <span className='p-2 rounded-md'>
                                <strong><u>Foi realizada uma saída do produto {logData.name} na data {formatDate(logData.date)}</u></strong>
                            </span>
                        </div>
                    ))}

                    {handleVerifyLog()}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}