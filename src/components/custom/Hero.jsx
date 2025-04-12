import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
    return (
            <div className='flex flex-col items-center gap-9 px-4 md:px-10 xl:px-56 max-w-screen-xl mx-auto'>
                <h1 className='font-extrabold text-center mt-16 text-3xl sm:text-4xl lg:text-5xl leading-tight'>
                    <span className='text-[#f56551] block'>
                        Descubra su próxima aventura con IA: </span>
                    <span className='block'>
                        Itinerarios personalizados al alcance de su mano
                    </span>
                </h1>
                <p className='text-lg sm:text-xl text-gray-500 text-center max-w-3xl'>Su planificador personal de viajes, que crea itinerarios personalizados adaptados a sus intereses y presupuesto</p>

                <Link to={'/create-trip'}>
                    <Button size={'xl'}>Empezar tu busqueda.</Button>
                </Link>

                <img src="/mockup.png" alt="mockup" className='mt-10 w-full max-w-[800px] object-contain' />
            </div>
    )
}

export default Hero