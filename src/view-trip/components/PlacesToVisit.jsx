import React from 'react'
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({trip}) {
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl mb-6'>Lugares para visitar</h2>

            <div className='space-y-10'>
                {trip?.tripData?.itinerary &&
                Object.entries(trip?.tripData?.itinerary)
                .sort(([a], [b]) => {
                    const dayNumA = parseInt(a.replace(/\D/g, ''), 10);
                    const dayNumB = parseInt(b.replace(/\D/g, ''), 10);
                    return dayNumA - dayNumB;
                })
                .map(([day, data], index) => (
                    <div key={index} >
                        <h2 className='font-semibold text-xl text-orange-600 mb-4'>
                            {day.replace(/day(\d+)/i, 'Dia $1')}
                        </h2>
                        <div className='ggrid sm:grid-cols-1 md:grid-cols-2 gap-6'>
                        {data.places?.map((place, i) => (
                            <div key={i} className=''>
                                <PlaceCardItem place={place} />
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit