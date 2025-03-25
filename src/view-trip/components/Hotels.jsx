import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5 mb-4'>Recomendación De Hotel</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <HotelCardItem key={index} hotel={hotel} />
                ))}
            </div>
        </div>

    )
}

export default Hotels