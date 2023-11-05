import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const POST = async (req:NextRequest) => {
    try {
        const session = await getServerSession(authOptions)
        console.log(session)

        if(!session?.user){
            return new NextResponse(JSON.stringify({message:"You have to signIn before!"}),{status:401})
        }

        const {listingId,startDate,endDate,totalPrice} = await req.json()

        console.log(listingId)

        if(!listingId || !startDate || !endDate || !totalPrice){
            return new NextResponse(JSON.stringify({message:"Missing informations!"}),{status:400})
        }

        const newReservation = await prisma.listing.update({
            where:{
                id:listingId
            },
            data : {
                reservations :{
                    create:{
                        startDate,
                        endDate,
                        totalPrice,
                        userId:session.user.id
                    }
                }
            }
        })

        return new NextResponse(JSON.stringify(newReservation),{status:201})

    } catch (error : any) {
        console.log("[RESERVATION_POST_ERROR] : ",error)
        return new NextResponse(JSON.stringify({message:error.message}),{status:500})
    }
}

export const GET = async (req:NextRequest) => {
    try {

        const reservations = await prisma.reservation.findMany()

        return new NextResponse(JSON.stringify(reservations),{status:200})

    } catch (error : any) {
        console.log("[RESERVATION_GET_ERROR] : ",error)
        return new NextResponse(JSON.stringify({message:error.message}),{status:500})
    }
}
