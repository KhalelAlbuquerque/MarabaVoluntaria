import imageCard from './imgs/crianca-card.webp'
import Image from 'next/image'
import { BsFillPersonPlusFill } from "react-icons/bs";
export default function CardVaga({ atividade, descricao, totalPessoas }) {
    return (
      <div className="flex flex-col w-72 bg-neutral-100 rounded-2xl shadow-2xl pb-4 h-[465px] border-2 border-zinc-300 relative">
        <div className="relative">
          <Image src={imageCard} alt="Picture of the author" className="rounded-t-2xl" />
          <div className="absolute bottom-2 left-4 py-2 bg-sky-300 w-[70px] rounded-3xl flex justify-center gap-2">
            <BsFillPersonPlusFill className="text-white text-lg" />
            <p className="text-white text-sm">{totalPessoas}</p>
          </div>
        </div>
        <div className="px-6 flex-grow">
          <div className="text-xl font-semibold mb-3">
            <p className="text-start text-blue-900">{atividade}</p>
          </div>
          <div>
            <p className="text-start text-gray-700 font-semibold text-sm">{descricao}</p>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button className="bg-sky-600 px-8 py-3 rounded-xl text-white font-bold shadow-2xl">
            Ver vaga
          </button>
        </div>
      </div>
    );
  }
  