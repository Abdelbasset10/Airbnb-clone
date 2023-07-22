import { getCurrentUser } from "@/actions/user/actions";

const useFavorite = async (listingId:string) => {
    try {
        const user = await getCurrentUser()
        if(!user){
            return false
        }

        if(user.favoriteIds.includes(listingId)){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

export default useFavorite