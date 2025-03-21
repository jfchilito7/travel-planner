import { Button } from '@/components/ui/button'
import React from 'react'
import { IoIosSend } from "react-icons/io";

function InfoSection({trip}) {
    return (
        <div>
            <img src='/fondo.webp' className='h-[600px] w-full object-fill rounded-xl' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-lg'>📅 Días: {trip.userSelection?.days}</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-lg'>💰 Costo: {trip.userSelection?.budget}</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-lg'>🥂 No. de viajeros: {trip.userSelection?.traveler}</h2>
                    </div>
                </div>
                <Button size={'xl'}><IoIosSend style={{width:'28px', height:'28px'}} /></Button>
            </div>
        </div>

    )
}

export default InfoSection