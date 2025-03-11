import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function CreateTrip() {
    const [place, setPlace] = useState();
    const [openDailog, setOpenDailog] = useState(false);
    const [formData, setFormData] = useState({});

    const handleInputChange = (name, value) => {

        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData);
    }, [formData])


    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error),
    })

    const OnGenerateTrip = async() => {

        const user= localStorage.getItem('user');

        if(!user) 
        {
            setOpenDailog(true);
            return;
        }

        if(formData?.days > 5 && !formData?.location || !formData?.budget || !formData?.traveler) 
        {
            toast("Por favor, complete todos los campos");
            return;
        }
        
        const FINAL_PROMPT = AI_PROMPT
        .replace('{location}',formData?.location?.label)
        .replace('{days}',formData?.days)
        .replace('{budget}',formData?.budget)
        .replace('{traveler}',formData?.traveler)
        .replace('{days}',formData?.days);

        console.log(FINAL_PROMPT);

        const result = await chatSession.sendMessage(FINAL_PROMPT);

        console.log(result?.response?.text());
    }

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
            OnGenerateTrip();
        })
    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">   
            <h2 className="font-bold text-3xl">Díganos sus preferencias de viaje 🏕️ 🏝️</h2>
            <p className="mt-3 text-gray-500 text-xl">
                Sólo tiene que facilitarnos algunos datos básicos y nuestro planificador de viajes generará un itinerario personalizado basado en sus preferencias.
            </p>

            <div className="mt-20 flex flex-col gap-10" >
                <div>
                <h2 className="text-xl my-3 font-medium">¿Cuál es tu destino elegido?</h2>
                <GooglePlacesAutocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    selectProps={{
                    placeholder: 'Escribe tu destino...',
                    place,
                    onChange:(value) => {setPlace(value); handleInputChange('location', value) }
                    }}
                />
                </div>

                <div className='mb-10'>
                    <h2 className="text-xl my-3 font-medium">¿Cuántos días planeas viajar?</h2>
                    <Input placeholder="Ejem. 3" type='number' 
                        onChange={(e) => handleInputChange('days', e.target.value)}
                    />
                </div>
            </div>

            <div className='mb-10'>
                <h2 className="text-xl my-3 font-medium">¿Cuál es tu presupuesto?</h2>
                <p></p>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div key={index} 
                            onClick={() =>handleInputChange('budget', item.title)}
                        className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                            ${formData?.budget==item.title && 'shadow-lg border-black'}    
                        `}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <p className='text-2sm text-gray-500'>{item.description}</p>
                        </div>  
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl my-3 font-medium">¿Con quién planeas viajar en tu próxima aventura?</h2>
                <p></p>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectTravelesList.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('traveler', item.people)}
                        className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                            ${formData?.traveler == item.people && 'shadow-lg border-black'}
                        `}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <p className='text-2sm text-gray-500'>{item.description}</p>
                        </div>  
                    ))}
                </div>  
            </div>
            <div className='my-10 flex justify-end'>
                <Button size={'xl'} onClick={OnGenerateTrip}>Generar Viaje</Button>
            </div>
            <Dialog open={openDailog}>
                <DialogContent> 
                    <img src='/public/logo.svg' alt='logo' />
                    <DialogHeader>
                        <DialogTitle className={'font-bold text-xl mt-5'}>Ingresa con Google</DialogTitle>
                        <DialogDescription>
                            <div>Ingresa a la App con Autenticación de Google</div>
                            <div>
                                <Button className={'w-full mt-5 flex gap-4 items-center'} size={'xl'}
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

    );
}

export default CreateTrip;