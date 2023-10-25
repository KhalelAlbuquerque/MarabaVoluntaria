import Image from "next/image"

export default function CardOng({localizacao, nomeONG, descONG, imageONG}){
    return (
        <div className="flex flex-col w-60 border-2 h-[375px] rounded-lg shadow-xl">
            <div className="h-2/5 overflow-hidden">
                <Image
                    src={`data:image/jpeg;base64,${imageONG}`}
                    alt="Imagem do card"
                    className="rounded-t-lg rounded-b-xl w-full h-full"
                    width={0}
                    height={0}
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