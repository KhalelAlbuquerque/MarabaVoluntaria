import Image from "next/image"
import fotoUser from '../UserInfo/perfilUser-removebg-preview.png'
import Link from "next/link"

export default function ProfilePost({post}){

    return(
        <Link href={'/'} className="w-5/6 bg-gray-600 m-auto mt-3 flex">
            <Image alt="Foto do post" src={fotoUser} height={100} width={100}/>
            <p>{post.title}</p>
        </Link>
    )

}