import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { SlPeople } from "react-icons/sl";
import Image from "next/image";
import foto from '@/components/Card/imgs/crianca-card.webp'
import { GiGreenhouse } from "react-icons/gi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";

export default function InfoVaga(){
    return (
        <div className="flex flex-col">
            <main className="h-screen">
                <div className="flex justify-between border-b-2 pb-3 mx-60 mt-6">
                    <div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold">
                                    Auxiliar de Biblioteca
                                </h1>
                                <p className="text-sm font-semibold text-gray-4 00">Publicada em 11/10/2023</p>
                            </div>
                            <div>
                                <p>Auxiliar na organização dos livros. Venha e faça parte da mudança!</p>
                            </div>
                            <div className="mt-2 flex items-center gap-2 border-r-4 w-32 rounded-r-full">
                                <SlPeople className="bg-sky-300 h-10 w-10 rounded-full p-2"/>
                                <p>1 Inscrito</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-96">
                        <div>
                            <Image
                            src={foto}
                            alt="Foto da vaga"
                            className="rounded-2xl w-96"
                            />
                        </div>
                        <div className="flex gap-2 mt-2 ml-2">
                            <div>
                                <GiGreenhouse className="text-5xl text-orange-500"/>
                            </div>
                            <div className="flex flex-col">
                                <div>
                                    <p className="text-gray-400 text-sm">Realizada pela ONG</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-600">Ponto de Cultura Tia Gê</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <button className="bg-sky-300 w-full rounded py-2 text-white flex items-center justify-center gap-3">
                                <BsFillPersonPlusFill className="text-lg"/>
                                <p>Quero me inscrever</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mx-60 flex flex-col">
                    <div className="text-sm flex flex-col gap-1.5 border-b-2 py-3">
                        <h1 className="text-gray-700 font-bold text-lg">Sobre a vaga</h1>
                        <p>Ponto de Cultura Tia Gê traz mais acesso para todas e todos. São atividades gratuitas culturais e educacionais, ligada á 7 núcleos.</p>
                        <p>O(a) voluntário(a) auxiliará na organização dos livros.</p>
                        <p>Venha e faça parte da mudança!</p>
                    </div>
                    <div className="py-3 border-b-2">
                        <h1 className="text-gray-700 font-bold text-lg">Horários</h1>
                        <div className="flex items-center gap-2">
                            <AiOutlineClockCircle className="text-xl"/>
                            <p>12 Horas Semanais</p>
                        </div>
                    </div>
                    <div className="py-3 flex-col">
                        <div className="text-gray-700 font-bold text-xl">
                            Realizada Pela ONG
                        </div>
                        <div className="flex gap-2">
                            <div>
                                <GiGreenhouse className="text-[50px] text-orange-500"/>
                            </div>
                            <div>
                                <h1 className="text-gray-700 font-semibold text-md">Ponto de Cultura Tia Gê</h1>
                                <p className="text-sm text-gray-500">Lorem ipsum, dolor sit amet consectetur consequatur facilis minus officiis vitae, a pariatur eum at sed nobis vero praesentium?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}