import Image from "next/image"
import fotoUser from '@/app/(dynamics)/myProfile/fotoUser.jpg'
import Link from "next/link"

export default function ProfilePost({post}){

    return(
        <Link href={'/'} className="w-5/6 bg-gray-600 m-auto mt-3 flex">
            <Image src={fotoUser} height={100} width={100}/>
            <p>{post.title}</p>
        </Link>
    )

}