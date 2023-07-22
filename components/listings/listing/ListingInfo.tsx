import { getUser } from "@/actions/user/actions"
import { categories } from "@/components/categories/data"
import { CountryInf } from "@/types"
import { Country } from "country-state-city"
import Image from "next/image"
import MapWraper from "./MapWraper"
import { IconType } from "react-icons"

interface Props {
    userId : string,
    guestCount : number,
    roomCount : number,
    bathroomCount : number,
    category : string
    desc:string,
    locationValue :CountryInf
}

const ListingInfo = async ({userId,guestCount,roomCount,bathroomCount,category,desc,locationValue} : Props) => {
    const user = await getUser(userId)
    const Category = categories.find((c)=>c.label === category)
    const CategoryIcon : IconType = Category?.icon as IconType
    return (
            <div className="flex flex-col gap-1 flex-[2]" >
                <div className="flex items-center gap-2" >
                    <h2 className="text-lg font-bold" >Hosted by {user?.name} </h2>
                    <Image src={`${user?.image ? user.image : "/images/user.jpg"} `} width={30} height={30} alt="user image" className="rounded-full" />
                </div>
                <div className="flex flex-wrap gap-2" >
                    <p>{guestCount} guests</p>
                    <p>{roomCount} rooms</p>
                    <p>{bathroomCount} bathrooms</p>
                </div>
                <div className="py-4 border-y-[1px] w-full flex items-center gap-2" >
                    <CategoryIcon className='text-2xl text-neutral-500' />
                    <div>
                        <h3 className="font-semibold" >{Category?.label}</h3>
                        <p className="text-neutral-500" >{Category?.description}</p>
                    </div>
                </div>
                <div>
                    <p className="text-neutral-500 py-4 border-b-[1px]" >{desc}</p>
                </div>
                <MapWraper lat={locationValue.lat} long={locationValue.long} />
            </div>
            
    )
}

export default ListingInfo