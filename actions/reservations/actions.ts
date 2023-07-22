import { prisma } from "@/lib/prisma"

import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

interface IParams {
    listingId? :string
    userId?:string
    authorId?:string
}

export const fetchReservations = async ({listingId,userId,authorId} : IParams) => {
    try {
        const query : any = {}

        if(listingId){
            query.listingId = listingId
        }

        if(userId){
            query.userId = userId
        }

        if(authorId){
            query.listing = {userId:authorId}
        }

        const reservations = await prisma.reservation.findMany({
            where:query,
            include:{
                listing:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })

        return reservations


    } catch (error) {
        console.log(error)
    }
}