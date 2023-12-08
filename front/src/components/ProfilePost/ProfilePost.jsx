import Image from "next/image"
import fotoUser from '../UserInfo/perfilUser-removebg-preview.png'
import Link from "next/link"

export default function ProfilePost({post}){

    return(
        <Link href={'/'} className="w-[90%] bg-sky-300 mx-auto flex rounded-md max-[1250px]:w-[100%]">
            <Image alt="Foto do post" className="rounded-l-md h-22 w-32" src={post.image} height={100} width={100}/>
            <p className="text-start text-black font-bold p-2">{post.title}</p>
        </Link>
    )

}