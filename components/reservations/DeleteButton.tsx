'use client'
import { useRouter } from 'next/navigation'
import {useState} from 'react'

import toast from 'react-hot-toast'

interface Props {
    userId:string,
    reservationId:string
    listingId:string
}

const DeleteButton = ({userId,reservationId,listingId} : Props) => {
    const router = useRouter()
    const [loading,setLoading] = useState(false)

    const handleCancelReservation = async () => {
        try {
            setLoading(true)
            await fetch(`${process.env.NEXTAUTH_URL}api/reservation/${reservationId}`,{
                method:"DELETE"
            })
            router.refresh()
            toast.success("Reservation canceled")
        } catch (error : any) {
            toast.error(error.message)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }


  return (
    <button className={`w-full h-10 text-center text-white rounded-lg ${loading ?"bg-black hover:bg-neutral-800" : "bg-rose-500 hover:bg-rose-400"}`} onClick={handleCancelReservation} >Cancel reservation</button>
  )
}

export default DeleteButton