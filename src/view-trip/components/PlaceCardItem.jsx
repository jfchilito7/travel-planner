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
            <div className='border rounded-xl p-3 mt-5 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img src={PhotoUrl?PhotoUrl:'/public/fondo.webp'} className='w-40 h-40 rounded-xl object-cover' alt="imagen lugar para visitar" />
                <div>
                    <h2 className='font-bold text-lg'>{place.placeName}</h2>
                    <p className='text-sm text-gray-500'>{place.details}</p>
                    <h2 className='font-medium text-sm text-orange-600 mt-2'>🕔 {place.openingHours}</h2>
                </div>
            </div>
        </a>
    )
}

export default PlaceCardItem