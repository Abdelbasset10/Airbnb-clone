import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/actions/user/actions";


export const PATCH = async (req:NextRequest, {params} : {params:{listingId : string}}) => {
    try {
        const user = await getCurrentUser()
        if(!user){
            return new NextResponse(JSON.stringify({message:"You have to sign in before!"}),{status:401})
        }

        let updatedListing
        if(user.favoriteIds.includes(params.listingId)){
            updatedListing = await prisma.user.update({
                where : {
                    id:user.id
                },
                data: {
                    favoriteIds:user.favoriteIds.filter((f)=>f !== params.listingId)
                }
            })
        }else{
            updatedListing = await prisma.user.update({
                where: {
                    id:user.id
                },
                data:{
                    favoriteIds : [...user.favoriteIds,params.listingId]
                }
            })
        }

        return new NextResponse(JSON.stringify(updatedListing),{status:200})

    } catch (error :any ) {
        console.log("[FAVOITE_LISTING_PATCH]",error)
        return new NextResponse(JSON.stringify({message : error.message}),{status:500})
    }
}