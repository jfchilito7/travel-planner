import { db } from '@/service/firebaseConfig';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {

    const navigation = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips();
    },[])

    /**
     * Used to Get all user trips
     * @returns 
     */

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if(!user)
        {
            navigation('/');
            return;
        }

        const q = query(collection(db,'AITrips'),where('userEmail','==',user?.email));
        const querySnapShot = await getDocs(q);
        setUserTrips([]);
        querySnapShot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal=>[...prevVal,doc.data()]);
        })
    }
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Mis Viajes</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
                {userTrips.map((trip, index) => (

                    <UserTripCardItem key={index} trip={trip} />
                ))}
            </div>
        </div>
    )
}

export default MyTrips