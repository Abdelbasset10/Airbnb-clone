
import useFavorite from "@/hooks/useFavorite";
import { Listing } from "@prisma/client"
import Image from "next/image"
import Link from "next/link";
import Heart from "./Heart";


interface Props {
    listing : Listing
}

const Listing = async ({listing} : Props) => {

  const isFavorite = await useFavorite(listing.id)
  
  return (

    <div className="cursor-pointer hover:bg-neutral-100" >
        <Link href={`/listings/${listing.id}`} >
            <div className="relative w-full h-48" >
                <Image src={listing.imageSrc} fill alt="listing image" className="rounded-lg hover:scale-90" />
                <Heart listingId={listing.id} isFavorite={isFavorite} />
            </div>
        
            <div className="flex flex-col mt-3" >
                <h2 className="text-bold text-xl" >{listing.locationValue.label}</h2>
                <p className="text-neutral-500" >{listing.category}</p>
                <p><span className="text-bold" >${listing.price}</span> par night</p>
            </div>
        </Link>
    </div>

  )
}

export default Listing