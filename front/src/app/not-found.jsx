import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Link from "next/link";

export default function Erro(){
    return (
        <div>
            <header>
                <Header/>
            </header>
            <main className="flex flex-col justify-center items-center">
                <div className="flex gap-2 mt-44">
                    <h1 className="font-bold border-r-2 text-lg pr-2 border-black">404</h1>
                    <h1 className="text-gray-800 font-semibold">Página não encontrada</h1>
                </div>
                <div className="mt-8">
                    <button className="py-2 px-8 font-semibold bg-sky-300 rounded-lg "><Link href={"/"}>Voltar para Home</Link></button>
                </div>
            </main>
            <footer className="fixed bottom-0 w-full">
                <Footer/>
            </footer>
        </div>
    )
}