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
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
    const [place, setPlace] = useState();

    const [openDailog, setOpenDailog] = useState(false);
    const [formData, setFormData] = useState({});
    
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
        
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
        .replace('{location}',formData?.location?.label)
        .replace('{days}',formData?.days)
        .replace('{budget}',formData?.budget)
        .replace('{traveler}',formData?.traveler)
        .replace('{days}',formData?.days);

        const result = await chatSession.sendMessage(FINAL_PROMPT);

        console.log("--", result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text());
    }

    const SaveAiTrip = async(TripData) => {
        
        setLoading(true);
        const user =JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/'+docId);
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
        <div className="px-5 sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10 max-w-screen-xl mx-auto">   
            <h2 className="font-bold text-2xl sm:text-3xl">Díganos sus preferencias de viaje 🏕️ 🏝️</h2>
            <p className="mt-3 text-gray-500 text-base sm:text-lg">
                Sólo tiene que facilitarnos algunos datos básicos y nuestro planificador de viajes generará un itinerario personalizado basado en sus preferencias.
            </p>

            <div className="mt-16 flex flex-col gap-10" >
                <div>
                <h2 className="text-lg sm:text-xl my-3 font-medium">¿Cuál es tu destino elegido?</h2>
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
                    <h2 className="text-lg sm:text-xl my-3 font-medium">¿Cuántos días planeas viajar?</h2>
                    <Input placeholder="Ejem. 3" type='number' 
                        onChange={(e) => handleInputChange('days', e.target.value)}
                    />
                </div>
            </div>

            <div className='mb-10 mt-10'>
                <h2 className="text-lg sm:text-xl my-3 font-medium">¿Cuál es tu presupuesto?</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div key={index} 
                            onClick={() =>handleInputChange('budget', item.title)}
                        className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                            ${formData?.budget==item.title && 'shadow-lg border-black'}    
                        `}>
                            <h2 className='text-3xl'>{item.icon}</h2>
                            <h2 className='font-bold text-base sm:text-lg'>{item.title}</h2>
                            <p className='text-sm text-gray-500'>{item.description}</p>
                        </div>  
                    ))}
                </div>
            </div>

            <div className='mt-10'>
                <h2 className="text-lg sm:text-xl my-3 font-medium">¿Con quién planeas viajar en tu próxima aventura?</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                    {SelectTravelesList.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('traveler', item.people)}
                        className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                            ${formData?.traveler == item.people && 'shadow-lg border-black'}
                        `}>
                            <h2 className='text-3xl'>{item.icon}</h2>
                            <h2 className='font-bold text-base sm:text-lg'>{item.title}</h2>
                            <p className='text-sm text-gray-500'>{item.description}</p>
                        </div>  
                    ))}
                </div>  
            </div>
            <div className='my-10 flex justify-end'>
                <Button size={'xl'} onClick={OnGenerateTrip} disabled={loading}>
                    {loading?
                    <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />: 'Generar Viaje'
                    }
                    </Button>
            </div>
            <Dialog open={openDailog}>
                <DialogContent> 
                    <img src='/public/logo.svg' alt='logo' />
                    <DialogHeader>
                        <DialogTitle className={'font-bold text-xl mt-5 text-center'}>Ingresa con Google</DialogTitle>
                        <DialogDescription className={'text-center'}>
                            <div>Ingresa a la App con Autenticación de Google</div>
                            <div className={'mt-5'}>
                                <Button
                                    className={'w-full flex gap-4 items-center justify-center'} size={'xl'}
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