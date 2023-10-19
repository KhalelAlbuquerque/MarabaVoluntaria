import Image from "next/image"
import imageCard from './imgs/crianca-card.webp'

export default function CardOng({localizacao, nomeONG, descONG}){
    return (
        <div className="flex flex-col w-60 border-2 h-[375px] rounded-lg shadow-xl">
            <div>
                <Image
                src={imageCard}
                alt="Imagem do card"
                className="rounded-t-lg rounded-b-xl"
                />
            </div>
            <div className=" mt-2 px-2 flex flex-col gap-1">
                <div className="text-orange-700">
                    <h1>{localizacao}</h1>
                </div>
                <div>
                    <h1 className="font-semibold">{nomeONG}</h1>
                </div>
                <div className="text-sm">
                    <p>{descONG}</p>
                </div>
            </div>
        </div>
    )
}