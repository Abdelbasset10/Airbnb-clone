import { fetchListing } from "@/actions/listings/actions"
import { fetchReservations } from "@/actions/reservations/actions"
import { getUser } from "@/actions/user/actions"
import Booking from "@/components/listings/listing/Booking"
import ListingHeader from "@/components/listings/listing/ListingHeader"
import ListingInfo from "@/components/listings/listing/ListingInfo"
import { authOptions } from "@/lib/auth"
import { CountryInf } from "@/types"
import { Listing, User } from "@prisma/client"
import { getServerSession } from "next-auth"
import Image from "next/image"

const ListingPage = async ({params} : {params:{listingId : string}}) => {
    const session = await getServerSession(authOptions)

    const listing : Listing = await fetchListing(params.listingId)
    const reservations = await fetchReservations({listingId:params.listingId})

    if(!listing){
        return (
            <div className="flex items-center justify-center" >
                <div className="w-full h-[70vh] flex flex-col items-center justify-center " >
                    <h1 className="text-lg font-bold" >No listing found!</h1>
                    <p className="text-neutral-500" >There is no listing with this id!.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="py-4 px-8" >
            <ListingHeader 
                title={listing.title} 
                locationValue={listing.locationValue.label} 
                imageSrc={listing.imageSrc} 
            />
            <div className="flex flex-col md:flex-row flex-wrap gap-8 justify-between my-4 " >
                <ListingInfo 
                    userId={listing.userId}
                    guestCount={listing.guestCount}
                    roomCount={listing.roomCount}
                    bathroomCount={listing.bathroomCount}
                    category={listing.category}
                    desc={listing.description}
                    locationValue={listing.locationValue as CountryInf}
                />
                    <Booking userId={session?.user?.id} listingId={listing.id} price={listing.price} reservations={reservations} />
            </div>
        </div>
    )
}

export default ListingPage