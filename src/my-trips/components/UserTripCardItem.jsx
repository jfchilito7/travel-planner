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
        <div>
            <img src={PhotoUrl?PhotoUrl:'/public/fondo.webp'} alt="imagen viaje" className='rounded-xl h-[240px] w-full object-cover'/>
            <div>
                <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                <h2 className='text-sm text-gray-500'>{trip?.userSelection.days} días de viaje con costo {trip?.userSelection.budget}</h2>
            </div>
        </div>
    )
}

export default UserTripCardItem