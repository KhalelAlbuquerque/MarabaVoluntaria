import Link from 'next/link'
import Image from "next/image"


export default async function CardOng({ongs}){
    return (
        <div className='flex justify-center gap-8 flex-wrap mt-6'>
            {ongs.map(async (data,index) => (
                <Link key={index+1} className='hover:scale-105 transition-transform duration-300' href={`ong/${data._id}`}>
                    <div className="flex flex-col w-72 max-[770px]:w-56 max-[770px]:h-[400px] bg-neutral-100 rounded-2xl shadow-2xl pb-4 h-[465px] border-2 border-zinc-300 relative">
                        <div className="h-2/5 overflow-hidden">
                            <Image
                                src={data.profPicture.image.image}
                                alt="Imagem do card"
                                className="rounded-t-lg rounded-b-xl w-full h-full"
                                width={0}
                                height={0}
                            />
                        </div>
                        <div className=" mt-2 px-2 flex flex-col gap-1">
                            <div className="text-orange-700">
                                <h1>{"Brasil"}</h1>
                            </div>
                            <div>
                                <h1 className="font-semibold">{data.name}</h1>
                            </div>
                            <div className="text-sm">
                                <p>{data.description}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}