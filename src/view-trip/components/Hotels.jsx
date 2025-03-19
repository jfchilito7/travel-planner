import React from 'react'

function Hotels({trip}) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5 mb-4'>Recomendación De Hotel</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <a 
                        key={index}
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + ", " + hotel?.location)}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        >
                        
                    <div className='hover:scale-110 transition-all cursor-pointer'>
                        <img src="/fondo.webp" className='rounded-xl' alt="imagen hotel"  />
                        <div className='my-2 flex flex-col gap-4'>
                            <h2 className='font-medium'>{hotel?.hotelName}</h2>
                            <h2 className='text-xs text-gray-500'>📍 {hotel?.location}</h2>
                            <h2 className='text-sm'>💰 {hotel?.price}</h2>
                            <h2 className='text-sm'>⭐️ {hotel?.rating}</h2>
                        </div>
                    </div>
                    </a>
                ))}
            </div>
        </div>

    )
}

export default Hotels