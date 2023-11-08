import Image from "next/image"
import fotoUser from '../UserInfo/perfilUser-removebg-preview.png'
import Link from "next/link"

export default function ProfilePost({post}){

    return(
        <Link href={'/'} className="w-[330px] bg-sky-300 mx-auto flex rounded-md max-[1100px]:w-[200px]">
            <Image alt="Foto do post" className="rounded-l-md" src={fotoUser} height={100} width={100}/>
            <p className="text-start text-black font-bold p-2">{post.title}</p>
        </Link>
    )

}