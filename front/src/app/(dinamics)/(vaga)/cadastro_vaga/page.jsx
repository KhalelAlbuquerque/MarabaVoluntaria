import { MdOutlineAddCircle } from "react-icons/md";

export default function CadastroVaga(){
    return (
        <div>
            <div className="flex justify-center items-center mt-12 mb-12">
                <div>
                    <MdOutlineAddCircle size={100}/>
                </div>
                <div>
                    <input className="text-xl bg-gray-100 py-3 px-4 rounded-lg" type="text" placeholder="Nome do projeto"/>
                </div>
            </div>
            <div className="w-4/5 mx-auto px-20 bg-green-200 py-16 rounded-xl mb-12">
                <div className="flex flex-col gap-1">
                    <p className="text-center">Descrição</p>
                    <input className="w-full py-3 px-4 rounded-lg" type="text" placeholder="Fale um pouco sobre a atividade..."/>
                </div>
                <div className="flex w-full gap-12 mt-4">
                    <div className="w-1/2 flex flex-col gap-1">
                        <p className="text-center">Data início:</p>
                        <input className="w-full py-3 px-4 rounded-lg" type="date"/>
                    </div>
                    <div className="w-1/2 flex flex-col gap-1">
                        <p className="text-center">Data término:</p>
                        <input className="w-full py-3 px-4 rounded-lg" type="date"/>
                    </div>
                </div>
                <div className="flex flex-col w-full mt-4 gap-1">
                    <div className="w-1/2">
                        <p>Horas semanais:</p>
                    </div>
                    <div className="flex gap-12 items-center">
                        <div className="w-1/2">
                            <input className="w-full py-3 px-4 rounded-lg" step={60} type="time"/>
                        </div>
                        <div className="w-1/2">
                            <button className="w-full bg-sky-800 py-3 rounded-md font-bold text-white">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}