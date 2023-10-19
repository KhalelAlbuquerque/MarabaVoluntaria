import { FaRegArrowAltCircleRight } from "react-icons/fa";
export default function User(){
    return (
        <div className="w-full">
            <div className="w-1/3 relative flex justify-center items-center bg-sky-300 mt-8 rounded-xl text-center mx-auto py-3 font-semibold">
                <FaRegArrowAltCircleRight className="absolute left-3 text-2xl"/>
                <h1>Seu perfil</h1>
            </div>
        </div>
    )
}