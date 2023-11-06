import { fetchUserListing } from "@/actions/listings/actions"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

import UserListings from "@/components/userListings/UserListings"

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

    const userListnings = await fetchUserListing(session.user.id)

    if(userListnings?.length === 0){
        return (
        <div className="flex items-center justify-center" >
            <div className="w-full h-[70vh] flex flex-col items-center justify-center " >
                <h1 className="text-lg font-bold" >No properties found!</h1>
                <p className="text-neutral-500" >Look like you didnt create any listing yet.</p>
                <p className="text-neutral-500">Click on <span className="font-bold text-black" >Airbnb your home in navbar</span> to create new property!</p>
            </div>
        </div>
        )
}

    return (
        <div className="p-4">
        <div className="mb-4" >
            <h1 className="text-xl font-bold" >Properties</h1>
            <p className="text-neutral-500" >List of your properties</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {userListnings?.map((listing,index)=>(
                <UserListings key={index} listing={listing} />
            ))}

        </div>
        
        </div>
    )
}

export default Properties