import Image from "next/image"
import Link from "next/link"
import DeleteButton from "./DeleteButton"

interface Props {
    listing : any
}

const UserListings = ({listing} : Props) => {
    return (
        <div className="cursor-pointer hover:bg-neutral-100" >
            <div className="relative w-full h-48" >
                <Image src={listing.imageSrc} fill alt="listing image" className="rounded-lg hover:scale-90" />
            </div>
            <Link href={`/listings/${listing.id}`} >
                <div className="flex flex-col mt-3" >
                    <h2 className="text-bold text-xl" >{listing.locationValue.label}</h2>
                    <p className="text-neutral-500" >{listing.category}</p>
                    <p><span className="text-bold" >${listing.price}</span> par night</p>
                </div>
            </Link>
            <DeleteButton listingId={listing.id}  />
        </div>
    )
}

export default UserListings