import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from '@react-oauth/google';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { Menu } from 'lucide-react';

function Header() {
    const users = JSON.parse(localStorage.getItem('user'));
    const [openDialog, setOpenDialog] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        console.log(users);
    }, []);

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error),
    });

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
        headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'application/json',
        },
        }).then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        setOpenDialog(false);
        window.location.reload();
        });
    };

    return (
        <div className="p-3 shadow-sm flex justify-between items-center px-5 flex-wrap gap-3">
        <a href="/" className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8 sm:h-10" />
        </a>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
            {users ? (
            <>
                <a href="/create-trip">
                <Button className="rounded-full">+ Crear Viaje</Button>
                </a>
                <a href="/my-trips">
                <Button className="rounded-full">Mis Viajes</Button>
                </a>
                <Popover>
                <PopoverTrigger className="bg-gray-100 p-1 rounded-full">
                    <img
                    src={users?.picture}
                    alt="img usuario"
                    className="h-9 w-9 rounded-full"
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <h2
                    className="cursor-pointer text-sm"
                    onClick={() => {
                        googleLogout();
                        localStorage.clear();
                        window.location.href = '/';
                    }}
                    >
                    Salir
                    </h2>
                </PopoverContent>
                </Popover>
            </>
            ) : (
            <Button size="xl" onClick={() => setOpenDialog(true)}>Ingresar</Button>
            )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
            </button>
        </div>

        {/* Dropdown for mobile */}
        {menuOpen && (
            <div className="w-full md:hidden mt-2 flex flex-col gap-3">
            {users ? (
                <>
                <a href="/create-trip">
                    <Button className="w-full">+ Crear Viaje</Button>
                </a>
                <a href="/my-trips">
                    <Button className="w-full">Mis Viajes</Button>
                </a>
                <Button
                    variant="outline"
                    onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.href = '/';
                    }}
                >
                    Salir
                </Button>
                </>
            ) : (
                <Button size="xl" className="w-full" onClick={() => setOpenDialog(true)}>Ingresar</Button>
            )}
            </div>
        )}

        {/* Dialog de login */}
        <Dialog open={openDialog}>
            <DialogContent>
            <img src="/logo.svg" alt="logo" className="mx-auto w-32" />
            <DialogHeader>
                <DialogTitle className="font-bold text-xl mt-5 text-center">
                Ingresa con Google
                </DialogTitle>
                <DialogDescription>
                <div className="text-center">Ingresa a la App con Autenticación de Google</div>
                <div className="mt-5">
                    <Button className="w-full flex gap-4 items-center justify-center" size="xl" onClick={login}>
                    <FcGoogle style={{ width: '28px', height: '28px' }} />
                    Ingresar con Google
                    </Button>
                </div>
                </DialogDescription>
            </DialogHeader>
            </DialogContent>
        </Dialog>
        </div>
    );
}

export default Header;