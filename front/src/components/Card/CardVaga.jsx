import imageCard from './imgs/crianca-card.webp'

import Image from 'next/image'
import Link from 'next/link'

import { BsFillPersonPlusFill } from "react-icons/bs";

export default async function CardVaga({vagas}) {
    return (
      <div className='flex justify-center gap-8 flex-wrap mt-6 max-[1197px]:justify-center max-[790px]:gap-8 max-[1140px]:gap-12 max-[320px]:gap-6'>
        {vagas.toReversed().map((data, index) => (
          <Link key={index + 1} className='hover:scale-105 transition-transform duration-300' href={`vaga/${data._id}`}>
            <div className="flex flex-col w-72 bg-neutral-100 rounded-2xl shadow-2xl pb-4 h-[465px] border-2 border-zinc-300 relative">
    
              <div className='h-48'>
                <div className="h-full overflow-hidden relative">
                  <Image
                    src={data.image ? `data:image/jpeg;base64,${data.image}` : imageCard}
                    alt="Picture of the author"
                    className="rounded-t-2xl rounded-b-xl w-full h-full"
                    width={0}
                    height={0}
                  />
                  <div className="absolute bottom-2 left-4 py-2 bg-sky-300 w-[70px] rounded-3xl flex justify-center gap-2">
                    <BsFillPersonPlusFill className="text-white text-lg" />
                    <p className="text-white text-sm">{index + 1}</p>
                  </div>
                </div>
              </div>
    
              <div className="px-6 flex-grow">
                <div className="text-xl font-semibold mb-3">
                  <p className="text-start text-blue-900">{data.title}</p>
                </div>
                <div>
                  <p className="text-start text-gray-700 font-semibold text-sm">{data.description}</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button className="bg-sky-600 px-8 py-3 rounded-xl text-white font-bold shadow-2xl">
                  Ver vaga
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
}