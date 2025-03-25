import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'

function HotelCardItem({hotel}) {

    const [PhotoUrl, setPhotoUrl] = useState();
    
        useEffect(() => {
            hotel&&GetPlacePhoto();
        },[hotel])
    
        const GetPlacePhoto = async () => {
            const data = {
                textQuery:hotel?.hotelName
            }
            const result = await GetPlaceDetails(data).then(resp => {
                console.log(resp.data.places[0].photos[3].name)
    
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
                setPhotoUrl(PhotoUrl);
            })
        }

    return (
        <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + ", " + hotel?.location)}`}
            target='_blank'
            rel='noopener noreferrer'
        >
                        
            <div className='hover:scale-110 transition-all cursor-pointer'>
                <img src={PhotoUrl} className='rounded-xl h-[240px] w-full object-cover' alt="imagen hotel"  />
                <div className='my-2 flex flex-col gap-4'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.location}</h2>
                    <h2 className='text-sm'>💰 {hotel?.price}</h2>
                    <h2 className='text-sm'>⭐️ {hotel?.rating}</h2>
                </div>
            </div>
        </a>
    )
}

export default HotelCardItem