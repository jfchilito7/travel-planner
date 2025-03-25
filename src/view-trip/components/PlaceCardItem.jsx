import React from 'react'

function PlaceCardItem({place}) {
    return (
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`} target='_blank' rel='noopener noreferrer'>
            <div className='border rounded-xl p-3 mt-5 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img src="/fondo.webp" className='w-40 h-40 rounded-xl' alt="imagen lugar para visitar" />
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