export const dynamic = 'force-dynamic'

import { fetchListings } from "@/actions/listings/actions"
import Listing from "@/components/listings/Listing"
import { Listing as ListingType } from "@prisma/client"

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const listings : ListingType[] = await fetchListings(searchParams)
  

  if(listings?.length === 0){
    return (
      <div className="flex items-center justify-center" >
          <div className="w-full h-[70vh] flex flex-col items-center justify-center " >
              <h1 className="text-lg font-bold" >No listings found!</h1>
              <p className="text-neutral-500" >There is no listing with that query!.</p>
          </div>
      </div>
    )
}
  
  return (
    <div className="py-8 px-4" >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" >
        {listings?.map((listing,index)=>(
          <Listing key={index} listing={listing} />
        ))}
      </div>

    </div>
  )
}

export default Home