import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req : NextRequest, {params} : {params:{listingId : string}} ) => {
    try {
        if(!params.listingId){
            return new NextResponse(JSON.stringify({message:"There is no listing with that id!"}),{status:400})
        }
        
        const listing = await prisma.listing.findUnique({
            where:{
                id:params.listingId
            },
            include:{
                reservations:true
            }
        })

        if(!listing){
            return new NextResponse(JSON.stringify({message:"Listing does no exists!"}),{status:404})
        }
        return new NextResponse(JSON.stringify(listing),{status:200})

    } catch (error : any) {
        console.log("[GET_LISTING_ERROR] : ",error)
        return new NextResponse(JSON.stringify(error.message),{status:500})
    }

}


export const DELETE = async (req : NextRequest, {params} : {params:{listingId : string}} ) => {
    try {

        const session = await getServerSession(authOptions)

        if(!session?.user){
            return new NextResponse(JSON.stringify({message:"You have to signIn before!"}),{status:401})
        }

        if(!params.listingId){
            return new NextResponse(JSON.stringify({message:"There is no listing with that id!"}),{status:400})
        }
        
        const listing = await prisma.listing.delete({
            where:{
                id:params.listingId,
                userId:session.user.id
            }
        })

        if(!listing){
            return new NextResponse(JSON.stringify({message:"Listing does no exists!"}),{status:404})
        }
        return new NextResponse(JSON.stringify(listing),{status:200})

    } catch (error : any) {
        console.log("[DELETE_LISTING_ERROR] : ",error)
        return new NextResponse(JSON.stringify(error.message),{status:500})
    }

}