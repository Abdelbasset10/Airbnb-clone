import Image from "next/image"
import Link from "next/link"
import Searches from "./Searches"
import MenuItems from "./MenuItems"

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Categories from "@/components/categories/Categories";


const Navbar = async () => {

  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  return (
    <nav className="w-full   border-b-[1px]" >
        <div className="flex px-8 sm:px-10 items-center border-b-[1px] py-4 justify-center sm:justify-between gap-4 flex-wrap " >
            <Link href={`/`} >
                <Image src="/images/logo.png" width={100} height={100} alt="logo" />
            </Link>
            <Searches />
            <MenuItems userId={userId} picture={session?.user?.picture} />
        </div>
        <Categories />

    </nav>
  )
}

export default Navbar