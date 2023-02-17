import { Header } from "./Header"
import { Menu } from "./Menu"
import boxIcon from "../assets/logo.png"
import { useState } from "react"
import { TableReports } from "./TableReports"

export const Reports = () => {
    const [showReport, setShowReport] = useState<boolean>(true)

    return (
        <>
            <Header />
            <div className="flex">
                <div className="w-100">
                    <Menu />
                </div>
                {showReport ? (
                    <div className="p-10 w-full h-full">
                        <h1 className="font-medium text-3xl">Relatórios</h1>
                        <div className="bg-white rounded-lg mt-12 shadow-lg w-[50%]">
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
                                    onClick={() => setShowReport(false)}
                                >
                                    Tirar relatório
                                </button>
                            </div>
                        </div>
                    </div>
                ): (
                    <div className="p-10 w-full mb-16">
                        <h1 className="font-medium text-3xl">Posição de estoque</h1>
                        <TableReports />
                    </div>
                )}
            </div>
        </>
    )
}