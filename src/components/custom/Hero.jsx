import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
    return (
            <div className='flex flex-col items-center mx-56 gap-9'>
                <h1 className='font-extrabold text-center mt-16'>
                    <span className='text-[#f56551]'>
                        Descubra su próxima aventura con IA: </span>
                    <span>
                        Itinerarios personalizados al alcance de su mano
                    </span>
                </h1>
                <p className='text-2xl text-gray-500 text-center'>Su planificador personal de viajes, que crea itinerarios personalizados adaptados a sus intereses y presupuesto</p>

                <Link to={'/create-trip'}>
                    <Button size={'xl'}>Empezar tu busqueda.</Button>
                </Link>

                <img src="/mockup.png" alt="mockup" className='mt-10' />
            </div>
    )
}

export default Hero