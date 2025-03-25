import React from 'react'
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({trip}) {
    return (
        <div>
            <h2 className='font-bold text-xl mb-3'>Lugares para visitar</h2>

            <div className='mt-5'>
                {trip?.tripData?.itinerary &&
                Object.entries(trip?.tripData?.itinerary)
                .sort(([a], [b]) => {
                    const dayNumA = parseInt(a.replace(/\D/g, ''), 10);
                    const dayNumB = parseInt(b.replace(/\D/g, ''), 10);
                    return dayNumA - dayNumB;
                })
                .map(([day, data], index) => (
                    <div key={index} >
                        <h2 className='font-medium text-lg mt-5'>
                            {day.replace(/day(\d+)/i, 'Dia $1')}
                        </h2>
                        <div className='grid md:grid-cols-2 gap-5'>
                        {data.places?.map((place, i) => (
                            <div key={i} className=''>
                                <h2 className='font-medium text-sm text-orange-600'>{place.openingHours}</h2>
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