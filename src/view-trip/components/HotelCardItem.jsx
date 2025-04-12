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
                        
            <div className='hover:scale-[1.03] transition-transform duration-300 cursor-pointer shadow-md rounded-xl overflow-hidden'>
                <img src={PhotoUrl?PhotoUrl:'/public/fondo.webp'} className='w-full h-[200px] sm:h-[240px] object-cover' alt="imagen hotel"  />
                <div className='p-4 flex flex-col gap-1 sm:gap-2'>
                    <h2 className='font-semibold text-base sm:text-lg line-clamp-1'>{hotel?.hotelName}</h2>
                    <h2 className='text-sm text-gray-500 line-clamp-1'>📍 {hotel?.location}</h2>
                    <h2 className='text-sm'>💰 {hotel?.price}</h2>
                    <h2 className='text-sm'>⭐️ {hotel?.rating}</h2>
                </div>
            </div>
        </a>
    )
}

export default HotelCardItem