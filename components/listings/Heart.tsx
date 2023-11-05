'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {useState} from 'react'
interface Props {
    isFavorite : boolean | null | undefined
    listingId : string
}

const Heart = ({listingId,isFavorite} : Props) => {
    const ok = isFavorite ? isFavorite : false
    const [favorite,setFavorite] = useState(ok)

    const handleLikeDislike = async () => {
        const response = await fetch(`${process.env.NEXTAUTH_URL}api/listing/favorite/${listingId}`,{
            method:"PATCH"
        })
        const data = await response.json()
        console.log(data?.favoriteIds)
        if(data?.favoriteIds?.includes(listingId)){
            setFavorite(true)
        }else{
            setFavorite(false)
        }
    }
    return (
        <div className='absolute top-2 right-2z' >
            {favorite ? (
                <AiFillHeart className=" text-red-500 text-3xl" onClick={handleLikeDislike} />
                ) : (
                <AiOutlineHeart className=" text-black text-3xl" onClick={handleLikeDislike}/>
                )}
        </div>
    )
}

export default Heart