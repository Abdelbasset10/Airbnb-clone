'use client'
import { useRouter } from 'next/navigation'
import {useState} from 'react'

import toast from 'react-hot-toast'

interface Props {
 
    listingId:string
}

const DeleteButton = ({listingId} : Props) => {
    const router = useRouter()
    const [loading,setLoading] = useState(false)

    const handleDeleteListing = async () => {
        try {
            setLoading(true)
            await fetch(`https://vercel.com/abdelbasset10/abdelbasset-reserve/api/listing/${listingId}`,{
                method:"DELETE"
            })
            router.refresh()
            toast.success("Listing deleted")
        } catch (error : any) {
            toast.error(error.message)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }


    return (
            <button className={`w-full h-10 text-center text-white rounded-lg ${loading ?"bg-black hover:bg-neutral-800" : "bg-rose-500 hover:bg-rose-400"}`} onClick={handleDeleteListing} >Delete Listing</button>
    )
}

export default DeleteButton