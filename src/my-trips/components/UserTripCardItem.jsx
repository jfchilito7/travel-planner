import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'

function UserTripCardItem({trip}) {

    const [PhotoUrl, setPhotoUrl] = useState();
    
        useEffect(() => {
            trip&&GetPlacePhoto();
        },[trip])
    
        const GetPlacePhoto = async () => {
            const data = {
                textQuery:trip?.userSelection?.location?.label
            }
            const result = await GetPlaceDetails(data).then(resp => {
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
                setPhotoUrl(PhotoUrl);
            })
        }


    return (
        <a href={'/view-trip/' + trip?.id}>
            <div className="hover:scale-105 transition-all flex flex-col gap-2">
            <div className="w-full aspect-[16/9] overflow-hidden rounded-xl bg-slate-100">
                <img
                src={PhotoUrl ?? '/fondo.webp'}
                alt="imagen viaje"
                className="w-full h-full object-cover"
                />
            </div>
            <div className="px-1">
                <h2 className="font-bold text-base sm:text-lg md:text-xl line-clamp-1">
                {trip?.userSelection?.location?.label}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                {trip?.userSelection.days} días de viaje con costo {trip?.userSelection.budget}
                </p>
            </div>
            </div>
        </a>
    )
}

export default UserTripCardItem