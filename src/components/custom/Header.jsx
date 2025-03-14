import React from 'react'
import { Button } from '../ui/button'

function Header() {
    return (
        <div className='p-3 shadow-sm flex justify-between items-center px-5'>
            <img src="/public/logo.svg" alt="Logo" />
            <div>
                <Button size={'xl'}>Ingresar</Button>
            </div>
        </div>
    )
}

export default Header