import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import MiniMapCard from './MiniMapCard';

// const G_KEY = process.env.REACT_APP_GKEY
const CHARITY_KEY = process.env.REACT_APP_GLOBAL_GIVING_KEY

const mapStyles = { 
    display: "flex",
    justifyContent: "center" ,      
    height: "100%",
    width: "100%",
    boxShadow: "0px 6px 18px -9px rgba(0,0,0, 0.75)"
};
  

function GeoLocationMap({lat, long, iso}) {

    const [loc, setLoc] = useState([]);

    const [ selected, setSelected ] = useState({});
  
    const onSelect = item => {
      setSelected(item);
    }

    // const currentPosition = {
    //     lat: lat,
    //     lng: long
    // }

    async function fetchRegionsPrjs(){
        const response  = await axios.get(`https://api.globalgiving.org/api/public/projectservice/countries/IN/projects/active?api_key=${CHARITY_KEY}`)
        console.log(response.data.projects.project.map(
            (project) => { 
                return{
                    id: project.id,
                    image: project.image.imagelink[3].url,
                    latitude: project.latitude,
                    longitude: project.longitude,
                    need: project.need,
                    urlCause:project.organization.url,
                    projectLink: project.projectLink,
                    summary: project.summary,
                    themes: project.themes.theme,
                    title: project.title,
                    longTermImpact:project.longTermImpact,
                    logo: project.organization.logoUrl,
                    region: project.region ,
                    isoCountry: project.iso3166CountryCode
                }
            }
        ))
        setLoc(response.data.projects.project.map(
            (project) => { 
                return{
                    id: project.id,
                    location:{
                        lat: project.latitude,
                        lng: project.longitude,                        
                    },
                    urlCause:project.organization.url,
                    projectLink: project.projectLink,
                    // summary: project.need,
                    themes: project.themes.theme,
                    title: project.title,
                    logo: project.organization.logoUrl,

                }
            }
        ))
    }

    useEffect(()=>{
        fetchRegionsPrjs()
    },[iso])


    return (
        <div style ={{width: "70%", height:"100%"}}>
            {console.log(loc[0]?.location)}
            <LoadScript
                googleMapsApiKey= {process.env.REACT_APP_GKEY}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={4}
                    center={loc[0]?.location}
                    // center={currentPosition}
                >
                    {
                        loc.map(item => {
                        return (
                            <Marker 
                                    key={item.id}
                                    position={item.location}
                                    onClick={() => onSelect(item)}
                                />
                            )
                        })
                    }
                    {
                        selected.location && 
                        (
                            <InfoWindow
                                position={selected.location}
                                clickable={true}
                                onCloseClick={() => setSelected({})}
                            >
                                {/* <p>{selected.id}</p> */}
                                <MiniMapCard 
                                    logo= {selected.logo}
                                    projectLink = {selected.projectLink}
                                    url ={selected.urlCause}
                                    // themes = {selected.themes}
                                    // summary = {selected.summary}
                                    title = {selected.title}
                                />
                            </InfoWindow>
                        )
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GeoLocationMap 
