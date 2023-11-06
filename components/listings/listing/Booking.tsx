'use client'

import { useState, useEffect, useMemo } from "react"
import Calendary from "./Calendary"
import { Range } from "react-date-range"
import {differenceInCalendarDays, eachDayOfInterval} from 'date-fns'
import { Reservation } from "@prisma/client"
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/redux/hooks"
import { openLogin } from "@/redux/features/modalSlice"

interface Props {
    userId:string | undefined,
    listingId:string
    price : number
    reservations :any
}

const Booking = ({userId,price, listingId, reservations} : Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }
  const [dateRange,setDateRange] = useState<Range>(selectionRange)
  const [totalPrice,setTotalPrice] = useState(price)
  const [loading,setLoading] = useState(false)

  const disabledDays = useMemo(()=>{
    let dates : Date[] = []
    reservations.map((reservation : any)=>{
      const range = eachDayOfInterval({
        start:new Date(reservation.startDate),
        end:new Date(reservation.endDate)
      })
      dates = [...dates,...range]

    })
    return dates
  },[reservations])

  const handleReserve = async () => {

    if(!userId){
      toast.error("You have to signIn before!")
      return
    }
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3000/api/reservation`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        listingId,
        startDate : dateRange.startDate,
        endDate : dateRange.endDate,
        totalPrice
      }),
    })
    const res2 = await res.json()
    console.log( res2)
      router.refresh()
      toast.success("Listing reserved!")
    } catch (error  : any) {
      toast.error(error.message)
      console.log(error)
    }
    finally{
      setLoading(false)
    }

  }

  useEffect(()=>{
    const numberOfDays = differenceInCalendarDays(dateRange.endDate as Date,dateRange.startDate as Date) 
    setTotalPrice(price * numberOfDays)
  },[dateRange])

  return (
    <div className="w-full border-[1px] rounded-lg flex-[1]" >
        <div className="pt-2 pb-4 px-4 border-b-[1px] flex items-center gap-1" >
            <p className="font-bold text-lg" >$ {price}</p>
            <p className="text-neutral-500" >night</p>
        </div>
        <div className="py-2 px-4" >
          <Calendary disabledDates={disabledDays} value={dateRange} onChange={(value : Range)=>setDateRange(value)} />
          <button disabled={loading} className={`w-full h-10 text-center ${loading ? "bg-black hover:bg-neutral-700" : "bg-rose-500 hover:bg-rose-400"} text-white rounded-lg `} onClick={handleReserve} >Reserve</button>
        </div>

        <div className="w-full px-4 py-2 flex items-center justify-between" >
          <p className="font-bold text-lg" >Total</p>
          <p className="text-lg font-bold" >$ {price}</p>
        </div>

    </div>
  )
}

export default Booking