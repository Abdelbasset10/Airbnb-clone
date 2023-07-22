import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'


import qs from 'query-string'
import { getCurrentUser } from '../user/actions'

interface Query {
    category?: string
    rooms?:number
    bathrooms?:number,
    location?:string,
    guests?:number,
    startDate?:string,
    endDate?:string
}

const url =`https://abdelbasset-airbnb-rjvfrs8or-abdelbasset10.vercel.app/api/listing`

export const fetchListings = async (query : Query) => {
    try {
        const URL = qs.stringifyUrl({
            url,
            query:{
                category : query.category,
                rooms:query.rooms,
                bathrooms:query.bathrooms,
                guests:query.guests,
                location:query.location,
                startDate:query.startDate,
                endDate:query.endDate
            }
        })
        const res = await fetch(URL,{cache:"no-cache"})
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}


export const fetchListing = async (listingId : string) => {
    try {
        const res = await fetch(`${url}/${listingId}`,{next:{revalidate:60}})
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchUserListing = async (userId : string) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session?.user){
            throw new Error("You have to signIn before!")
        }

        const userListings = await prisma.listing.findMany({
            where:{
               userId 
            }
        })

        return userListings

    } catch (error) {
        console.log(error)
    }
}

export const getFavorietListings = async () => {
    try {
        const user = await getCurrentUser()

        if(!user){
            throw new Error("You have to signIn before!")
        }

        const favoritesListings = await prisma.listing.findMany({
            where:{
                id:{
                    in:[...user.favoriteIds]
                }
            }
        })

        return favoritesListings
        
       

    } catch (error) {
        console.log(error)
    }
}


