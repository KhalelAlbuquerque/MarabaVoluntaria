import { FaSearch } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import SideBar from "./SideBar/SideBar.jsx";
import InputSignIn from "../Input/InputSignIn.jsx";

export default function Header(){
    return (
        <header className="flex max-[433px]:px-0 min-[520px]:px-8 justify-between lg:px-28 py-6 justify- items-center bg-sky-300 min-[433px]:px-2 min-[1600px]:pr-48">
            <div className="flex lg:hidden">
                <SideBar/>
            </div>
            <div className="flex gap-8 items-center">
                <FaHandshake className="text-6xl max-[1024px]:hidden"/>
                <InputSignIn type="text" name="search" icon={FaSearch} placeholder="Pesquisar..."/>
            </div>
            <div className="flex gap-4 items-center font-semibold max-[1024px]:hidden">
                <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Home</a>
                <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Sou uma ONG</a>
                <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Login</a>
                <a className="text-sky-950 hover:text-gray-500 hover:underline cursor-pointer transition-colors duration-300">Ajuda</a>
            </div>
            <div className="sm:flex md:flex lg:hidden max-[432px]:hidden ">
                <FaHandshake className="text-6xl"/>
            </div>
        </header>
    )
}