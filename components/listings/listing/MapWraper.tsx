'use client'

import dynamic from "next/dynamic"

const MapComp = dynamic(() => import("@/components/modals/listModal/MapComp"), {
    loading: () => <p>loading...</p>,
    ssr: false
})

interface Props {
    lat:string,
    long:string
}
const MapWraper = ({lat,long} : Props) => {
  return (
    <div className="w-full my-4 h-96" >
        <MapComp lat={lat} long={long} />
    </div>
  )
}

export default MapWraper