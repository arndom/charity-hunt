import React from 'react'

import { GoogleMap, LoadScript} from '@react-google-maps/api';

function GeoLocationMap({lat, long}) {

    const mapStyles = { 
        display: "flex",
        justifyContent: "center" ,      
        height: "100%",
        width: "100%",
        boxShadow: "0px 6px 18px -9px rgba(0,0,0, 0.75)"
    };
      
    const defaultCenter = {
    lat: lat, lng: long
    }

    return (
        <div style ={{width: "70%", height:"100%"}}>
            <LoadScript
                googleMapsApiKey= {process.env.REACT_APP_GKEY}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={7}
                    center={defaultCenter}
                />
            </LoadScript>
        </div>
    )
}

export default GeoLocationMap 
