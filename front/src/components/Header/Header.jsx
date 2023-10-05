import InputPrimario from "../Input/InputPrimario.jsx";
import { FaSearch } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import SideBar from "./SideBar/SideBar.jsx";

export default function Header(){
    return (
        <header className="flex py-6 justify-between items-center bg-sky-300">
            <div className="flex lg:hidden">
                <SideBar />
            </div>
            <div className="flex gap-8 items-center">
                <FaHandshake className="text-6xl max-[1024px]:hidden"/>
                <InputPrimario type="text" name="search" icon={FaSearch} placeholder="Pesquisar..."/>
            </div>
            <div className="flex gap-4 items-center font-semibold max-[1024px]:hidden">
                <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Home</a>
                <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Sou uma ONG</a>
                <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Login</a>
                <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Ajuda</a>
            </div>
        </header>
    )
}