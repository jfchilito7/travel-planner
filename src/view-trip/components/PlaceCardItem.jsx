import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'

function PlaceCardItem({place}) {
    const [PhotoUrl, setPhotoUrl] = useState();
        
            useEffect(() => {
                place&&GetPlacePhoto();
            },[place])
        
            const GetPlacePhoto = async () => {
                const data = {
                    textQuery:place.placeName
                }
                const result = await GetPlaceDetails(data).then(resp => {
                    const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
                    setPhotoUrl(PhotoUrl);
                })
            }
    return (
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`} target='_blank' rel='noopener noreferrer'>
            <div className='border rounded-2xl p-4 mt-5 flex flex-col sm:flex-row gap-5 hover:scale-[1.02] transition-transform duration-300 hover:shadow-md cursor-pointer'>
                <img src={PhotoUrl?PhotoUrl:'/public/fondo.webp'} className='w-full sm:w-40 h-40 rounded-xl object-cover' alt="imagen lugar para visitar" />
                <div className='flex-1'>
                    <h2 className='font-bold text-lg mb-1'>{place.placeName}</h2>
                    <p className='text-sm text-gray-600'>{place.details}</p>
                    <h2 className='text-sm text-orange-600 mt-2 font-medium'>🕔 {place.openingHours}</h2>
                </div>
            </div>
        </a>
    )
}

export default PlaceCardItem