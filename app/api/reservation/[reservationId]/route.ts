import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req : NextRequest, {params} : {params:{reservationId : string}} ) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session?.user){
            return new NextResponse(JSON.stringify({message : "you have to sing in before!"}),{status:401})
        }

        if(!params.reservationId){
            return new NextResponse(JSON.stringify({message:"There is no reservation with that id!"}),{status:400})
        }

        const reservation = await prisma.reservation.findFirst({
            where:{
                id:params.reservationId,
                OR:[
                    {
                        userId:session.user.id
                    },
                    {
                        listing:{
                            userId:session.user.id
                        }
                    }
                ]
            }
        })

        if(!reservation){
            return new NextResponse(JSON.stringify({message:"UnAuthorized!"}),{status:400})
        }

        const deleteReservation = await prisma.reservation.deleteMany({
            where:{
                id:params.reservationId,
                OR:[
                    {
                        userId:session.user.id
                    },
                    {
                        listing:{
                            userId:session.user.id
                        }
                    }
                ]
            }
        })

        return new NextResponse(JSON.stringify(deleteReservation),{status:200})
            

    } catch (error : any) {
        console.log("[DELETE_LISTING_ERROR] : ",error)
        return new NextResponse(JSON.stringify(error.message),{status:500})
    }

}