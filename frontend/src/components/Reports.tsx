import { Header } from "./Header"
import { Menu } from "./Menu"
import { useState } from "react"
import { TableReport1 } from "./TableReport1"
import { TableReport2 } from "./TableReport2"
import boxIcon from "../assets/logo.png"

export const Reports = () => {
    const [showReport1, setShowReport1] = useState<boolean>(true)
    const [showReport2, setShowReport2] = useState<boolean>(true)

    const handleChangeReport1 = () => {
        setShowReport1(false)
        setShowReport2(true)
    }

    const handleChangeReport2 = () => {
        setShowReport1(true)
        setShowReport2(false)
    }

    return (
        <>
            <Header />
            <div className="flex">
                <div className="w-100">
                    <Menu />
                </div>
                <div className="p-10 w-full h-full">
                    <h1 className="font-medium text-3xl">Relatórios</h1>
                        <div className="flex gap-10 max-[1024px]:flex-col transition-all">
                            <div className="bg-white rounded-lg mt-12 shadow-lg">
                            <h1 className="px-3 py-2 text-gray-600 text-bold text-lg text font-semibold">Posição de estoque</h1>
                            <hr />
                            <div className="py-3 px-5 flex gap-5 items-center">
                                <img src={boxIcon} alt="Entrada no estoque" width={50} />
                                <hr />
                                <p className="text-base font-semibold">
                                    O relatório de posição de estoque irá mostrar como está o seu estoque no momento, considerando quantidade, preço, etc.
                                </p>
                            </div>
                            <hr />
                            <div className="flex items-center justify-center p-3">
                                <button 
                                    className="bg-blue-500 mt-1 py-2 px-5 rounded-lg text-white transition-all hover:brightness-110"
                                    onClick={handleChangeReport1}
                                >
                                    Tirar relatório
                                </button>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg mt-12 shadow-lg">
                            <h1 className="px-3 py-2 text-gray-600 text-bold text-lg text font-semibold">Contagem de entradas/saídas</h1>
                            <hr />
                            <div className="py-3 px-5 flex gap-5 items-center">
                                <img src={boxIcon} alt="Entrada no estoque" width={50} />
                                <hr />
                                <p className="text-base font-semibold">
                                    O relatório de contagem de entradas/saídas irá mostrar a quantidade de entradas e saídas feitas de um determinado produto.
                                </p>
                            </div>
                            <hr />
                            <div className="flex items-center justify-center p-3">
                                <button 
                                    className="bg-blue-500 mt-1 py-2 px-5 rounded-lg text-white transition-all hover:brightness-110"
                                    onClick={handleChangeReport2}
                                >
                                    Tirar relatório
                                </button>
                            </div>
                        </div>
                    </div>
                    {!showReport1 && (
                        <div className="w-full h-screen">
                            <TableReport1 />
                        </div>
                    )}

                    {!showReport2 && (
                        <div className="w-full h-screen">
                            <TableReport2 />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}