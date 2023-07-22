import { getCurrentUser } from "@/actions/user/actions";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DateTime } from 'luxon';
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req : NextRequest) => {
    try {
        const user = await getCurrentUser()

        if(!user){
            return new NextResponse(JSON.stringify({message:"You have to sign in before!"}),{status:401})
        }

        const {
                title
                ,description
                ,imageSrc
                ,category
                ,roomCount
                ,bathroomCount
                , guestCount
                ,locationValue
                ,price
            } = await req.json()
            if(!title || !description || !imageSrc || !category || !roomCount|| !bathroomCount || !guestCount || !locationValue || !price){
                return new NextResponse(JSON.stringify({message:"Missing informations!"}),{status:400})
            }

            const newListing = await prisma.listing.create({
                data:{
                    title,
                    description,
                    imageSrc,
                    category,
                    roomCount,
                    bathroomCount,
                    guestCount,
                    locationValue,
                    price,
                    userId:user.id,
                }
            })

            return new NextResponse(JSON.stringify(newListing),{status:201})

    } catch (error : any) {
        console.log("LISTING_POST_ERROR : ",error)
        return new NextResponse(JSON.stringify({message:error.message}),{status:500})
    }
}

export const GET = async (req : NextRequest) => {
    try {
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        
        const categoryQuery = searchParams.get("category") || undefined
        const locationQuery = searchParams.get("location") || undefined
        const guestsQuery = Number(searchParams.get("guests")) || undefined
        const roomsQuery = Number(searchParams.get("rooms")) || undefined
        const bathroomsQuery = Number(searchParams.get("bathrooms")) || undefined
        const startDate = searchParams.get("startDate")|| undefined
        const endDate = searchParams.get("endDate")|| undefined
        let STARTDATE
        let ENDDATE

        if(startDate && endDate){
            STARTDATE = DateTime.fromFormat(startDate,"dd-MM-yyyy").toISO() as string
            ENDDATE = DateTime.fromFormat(endDate,"dd-MM-yyyy").toISO() as string
            const listings = await prisma.listing.findMany({
                where :{
                    reservations: {
                        some: {
                            NOT:{
                                OR: [
                                    {
                                    endDate: { gte: STARTDATE },
                                    startDate: { lte: STARTDATE }
                                    },
                                    {
                                    startDate: { lte: ENDDATE},
                                    endDate: { gte: ENDDATE }
                                    }
                                ]
                            }
                        }
                    },
                    category : categoryQuery,
                    roomCount:{
                        gte:roomsQuery
                    },
                    bathroomCount:{
                        gte:bathroomsQuery
                    },
                    guestCount:{
                        gte:guestsQuery
                    },
                    locationValue:{
                        is:{
                            label:locationQuery
                        }
                    },
                
                }
            })
            return new NextResponse(JSON.stringify(listings),{status:200})
        }else{
            const listings = await prisma.listing.findMany({
                where :{
                    category : categoryQuery,
                    roomCount:{
                        gte:roomsQuery
                    },
                    bathroomCount:{
                        gte:bathroomsQuery
                    },
                    guestCount:{
                        gte:guestsQuery
                    },
                    locationValue:{
                        is:{
                            label:locationQuery
                        }
                    },
                
                }
            })
            return new NextResponse(JSON.stringify(listings),{status:200})
       }
    } catch (error : any) {
        console.log("LISTING_GET_ERROR : ",error)
        return new NextResponse(JSON.stringify({message:error.message}),{status:500})
    }
}