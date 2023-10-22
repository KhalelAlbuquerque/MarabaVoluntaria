import Image from "next/image"
import pfpteste from '@/components/PostSubscribers/pfpteste.jpg'

export default async function PostSubcribers(){

    const users = await fetch('https://jsonplaceholder.typicode.com/users').then(e=>e.json())

    return(
        <div className="p-3 w-1/4 divide-y">
            <h1 className="font-bold text-xl text-gray-600">Inscritos na vaga</h1>
            <div className="mt-4 overflow-auto h-60 divide-y-2 flex flex-col gap-4 justify-start">
            {users.map((element) => (
                <div className=" pt-2 flex gap-6 justify-start" key={element.id}>
                    <div className="w-20 h-20">
                        <Image
                            className="rounded-full"
                            src={pfpteste}
                            layout="responsive"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col">
                    <strong>Name:</strong> {element.username}
                    <strong>Phone:</strong> {element.phone}
                    </div>
                </div>
                ))}
            </div>
        </div>
    )

}