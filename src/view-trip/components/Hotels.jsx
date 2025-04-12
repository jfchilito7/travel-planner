import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-xl sm:text-2xl mb-6 text-center sm:text-left'>Recomendación De Hotel</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <HotelCardItem key={index} hotel={hotel} />
                ))}
            </div>
        </div>

    )
}

export default Hotels