import { fetchReservations } from "@/actions/reservations/actions"
import Reservation from "@/components/reservations/Reservation"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const Trips = async () => {
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

  const reservations = await fetchReservations({userId:session.user.id})

  if(reservations?.length === 0){
    return (
      <div className="flex items-center justify-center" >
          <div className="w-full h-[70vh] flex flex-col items-center justify-center " >
              <h1 className="text-lg font-bold" >No trips found!</h1>
              <p className="text-neutral-500" >Look like you didnt reserver any listing yet.</p>
          </div>
      </div>
    )
}

  return (
    <div className="p-4">
      <div className="mb-4" >
        <h1 className="text-xl font-bold" >Trips</h1>
        <p className="text-neutral-500" >Where you have been and where you are going</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {reservations?.map((reservation,index)=>(
          <Reservation key={index} userId={session.user.id} reservation={reservation} />
        ))}

      </div>
      
    </div>
  )
}

export default Trips