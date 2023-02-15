import { FaChartLine, FaArchive, FaClipboardList } from "react-icons/fa";
import "../global.css"
import { Link } from "react-router-dom";

export const Menu = () => {
    return (
        <nav className="bg-white w-52 h-full min-h-screen shadow-xl border-t-2 max-md:flex-col transition-all">
            <div className="flex flex-col mt-12">
                <Link to="/">
                    <div className="group flex justify-center items-center gap-3 py-2 transition-colors hover:bg-blue-400 hover:shadow-inner hover:cursor-pointer">
                        <FaChartLine className="text-gray-500 group-hover:text-white" size={30}/>
                        <span className="text-gray-500 group-hover:text-white">Dashboard</span>
                    </div>
                </Link>

                <Link to="/acoes">
                    <div className="mt-7 group flex justify-center items-center gap-3 py-2 transition-colors hover:bg-blue-400 hover:shadow-inner hover:cursor-pointer">
                        <FaArchive className="text-gray-500 group-hover:text-white" size={30}/>
                        <span className="text-gray-500 group-hover:text-white">Ações</span>
                    </div>
                </Link>

                <Link to="/relatorios">
                    <div className="mt-7 group flex justify-center items-center gap-3 py-2 transition-colors hover:bg-blue-400 hover:shadow-inner hover:cursor-pointer">
                        <FaClipboardList className="text-gray-500 group-hover:text-white" size={30}/>
                        <span className="text-gray-500 group-hover:text-white">Relatórios</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}