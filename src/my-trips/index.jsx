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
        <div className='max-w-screen-xl mx-auto sm:px-6 px-4 mt-10'>
            <h2 className='font-bold text-3xl'>Mis Viajes</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
                {userTrips?.length>0?userTrips.map((trip, index) => (

                    <UserTripCardItem key={index} trip={trip} />
                ))
            :[1,2,3,4,5,6].map((item, index) => (
                <div key={index} className='h-64 w-full bg-slate-200 animate-pulse rounded-xl'>

                </div>
            ))
            }
            </div>
        </div>
    )
}

export default MyTrips