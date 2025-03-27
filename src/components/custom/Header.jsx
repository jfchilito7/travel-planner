import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useEffect } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';


function Header() {

    const users=JSON.parse(localStorage.getItem('user'));
    const [openDailog, setOpenDailog] = useState(false);

    useEffect(() => {
        console.log(users);
    },[])

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error),
    })

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, 
            {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: 'application/json'
                }
        }).then((response) => {
            console.log(response);
            localStorage.setItem('user', JSON.stringify(response.data));
            setOpenDailog(false);
            window.location.reload();
        })
    }

    return (
        <div className='p-3 shadow-sm flex justify-between items-center px-5'>
            <a href={'/'}>
                <img src="/public/logo.svg" alt="Logo" />
            </a>
            <div>
                {users?
                    <div className='flex items-center gap-3'>
                        <a href='/create-trip'>
                            <Button className={'rounded-full'}>+ Crear Viaje</Button>
                        </a>
                        <a href='/my-trips'>
                            <Button className={'rounded-full'}>Mis Viajes</Button>
                        </a>
                        <Popover>
                            <PopoverTrigger className='bg-gray-100 p-1 rounded-full'>
                                <img src={users?.picture} alt="img usuario" className='h-9 w-9 rounded-full' />
                            </PopoverTrigger>
                            <PopoverContent>
                                <h2 className='cursor-pointer' onClick={() => {
                                    googleLogout();
                                    localStorage.clear();
                                    window.location.href='/';
                                }}>Salir</h2>
                            </PopoverContent>
                        </Popover>

                    </div>
                    :
                    <Button size={'xl'} onClick={() =>setOpenDailog(true)}>Ingresar</Button>
                }
                
            </div>
            <Dialog open={openDailog}>
                <DialogContent> 
                    <img src='/public/logo.svg' alt='logo' />
                    <DialogHeader>
                        <DialogTitle className={'font-bold text-xl mt-5'}>Ingresa con Google</DialogTitle>
                        <DialogDescription>
                            <div>Ingresa a la App con Autenticación de Google</div>
                            <div>
                                <Button
                                    className={'w-full mt-5 flex gap-4 items-center'} size={'xl'}
                                    onClick={login}
                                >
                                    <FcGoogle style={{width:'28px', height:'28px'}} />
                                    Ingresar con Google
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Header