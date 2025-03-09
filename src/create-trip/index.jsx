import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function CreateTrip() {
    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl">Díganos sus preferencias de viaje</h2>
        <p className="mt-3 text-gray-500 text-xl">
            Sólo tiene que facilitarnos algunos datos básicos y nuestro planificador de viajes generará un itinerario personalizado basado en sus preferencias.
        </p>

        <div className="mt-20">
            <div>
            <h2 className="text-xl my-3 font-medium">¿Cuál es tu destino elegido?</h2>
            <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                placeholder: 'Escribe tu destino...',
                }}
            />
            </div>
        </div>
        </div>
    );
}

export default CreateTrip;