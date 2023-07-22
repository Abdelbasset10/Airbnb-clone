import { fetchUserListing, getFavorietListings } from "@/actions/listings/actions"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

import UserListings from "@/components/userListings/UserListings"
import Listing from "@/components/listings/Listing"

const Properties = async () => {
    const session = await getServerSession(authOptions)

    if(!session?.user){
        return (
        <div className="flex items-center justify-center" >
            <div className="w-full h-[70vh] flex flex-col items-center justify-center " >
                <h1 className="text-lg font-bold" >UnAuthorized</h1>
                <p className="text-neutral-500" >You have to sign in before!</p>
            </div>
        </div>
        )
    }

    const favorites = await getFavorietListings()

    if(favorites?.length === 0){
        return (
        <div className="flex items-center justify-center" >
            <div className="w-full h-[70vh] flex flex-col items-center justify-center " >
                <h1 className="text-lg font-bold" >No favorites found!</h1>
                <p className="text-neutral-500" >Looks like you didn't favorite any listing.</p>
            </div>
        </div>
        )
}

    return (
        <div className="p-4">
        <div className="mb-4" >
            <h1 className="text-xl font-bold" >Favorites</h1>
            <p className="text-neutral-500" >List of places you have favorited</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favorites?.map((listing,index)=>(
                <Listing key={index} listing={listing} />
            ))}

        </div>
        
        </div>
    )
}

export default Properties