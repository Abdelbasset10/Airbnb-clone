import Image from "next/image"
import Link from "next/link"
import DeleteButton from "./DeleteButton"

interface Props {
    userId:string,
    reservation : any
}

const Reservation = ({userId,reservation} : Props) => {
    return (
        <div className="cursor-pointer hover:bg-neutral-100" >
            <div className="relative w-full h-48" >
                <Image src={reservation.listing.imageSrc} fill alt="listing image" className="rounded-lg hover:scale-90" />
            </div>
            <Link href={`/listings/${reservation.listingId}`} >
                <div className="flex flex-col mt-3" >
                    <h2 className="text-bold text-xl" >{reservation.listing.locationValue.label}</h2>
                    <p className="text-neutral-500" >{reservation.listing.category}</p>
                    <p><span className="text-bold" >${reservation.totalPrice}</span> par night</p>
                </div>
            </Link>
            <DeleteButton userId={userId} reservationId={reservation.id} listingId={reservation.listingId} />
        </div>
    )
}

export default Reservation