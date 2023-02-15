import { FaUserAlt, FaBell } from "react-icons/fa"
import logo from "../assets/logo.png"

export const Header = () => {
    return (
        <header className="bg-white h-18 shadow-[0_0_12px_0_rgba(0,0,0,0.3)] py-5 px-8 flex items-center justify-between">
            <div className="flex items-center gap-2 leading-tight font-medium text-center">
                <img src={logo} alt="Logo" width={35} height={35} />
                <h1>Estoque <br /> Fácil</h1>
            </div>
            <div className="flex gap-12">
                <FaBell size={20} className="hover:cursor-pointer transition-transform duration-300 hover:scale-125" />
                <FaUserAlt size={20} className="hover:cursor-pointer transition-transform duration-300 hover:scale-125" />
            </div>
        </header>
    )
}
