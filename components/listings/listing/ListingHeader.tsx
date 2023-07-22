import Image from "next/image"

interface Props {
    title:string,
    locationValue:string,
    imageSrc:string
}

const ListingHeader = ({title,locationValue,imageSrc} : Props) => {
    return (
        <div className="flex flex-col gap-1" >
                        <h1 className="text-xl font-bold" >{title}</h1>
                        <p className="text-neutral-500" >{locationValue}</p>
                        <div className="relative w-full h-[60vh] " >
                            <Image src={imageSrc} fill alt="listing image" className="object-cover rounded-xl" />
                        </div>
                    </div>
    )
}

export default ListingHeader