import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import Geocode from "react-geocode";
import { useHistory } from 'react-router-dom';
import * as ROUTES from "../constants/routes"

import GeoLocationMap  from '../components/GeoLocationMap';
import Footer from '../components/Footer';

const CHARITY_KEY = process.env.REACT_APP_GLOBAL_GIVING_KEY

function Landing() {

    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [iso, setISO] = useState("");

    const [activePrjs, setActivePrjs] = useState(0);
    const [totalPrjs, setTotalPrjs] = useState(0);

    const history = useHistory();

    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView()    

    async function fetchActiveProject(){
        const response = await axios.get(`https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=${CHARITY_KEY}`)
        // console.log(response.data.projects)
        // console.log(response.data.projects.numberFound)
        setActivePrjs(response.data.projects.numberFound)
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
    }

    async function fetchTotalProject(){
        const response = await axios.get(`https://api.globalgiving.org/api/public/projectservice/all/projects?api_key=${CHARITY_KEY}`)
        // console.log(response.data.projects)
        console.log(response.data.projects.numberFound)
        setTotalPrjs(response.data.projects.numberFound)
    }

    async function fetchRegions(){
        const response  = await axios.get(`https://api.globalgiving.org/api/public/projectservice/regions?api_key=${CHARITY_KEY}`)
        console.log(response.data.regions.region.map(
            (region) => region.name
        ))
    }

    async function fetchThemes(){
        const response  = await axios.get(`https://api.globalgiving.org/api/public/projectservice/themes?api_key=${CHARITY_KEY}`)
        console.log(response.data.themes.theme.map(
            (theme) => theme.name
        ))
    }

    const getPosition = () => {

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( (position) => {
                // console.log(position)
                // console.log(navigator)
                setLat(position.coords.latitude)
                setLong(position.coords.longitude)
              }
            )
        }else{
            alert("GeoLocation not supported in this browser")
        }

    }

    function geo(){
        Geocode.setApiKey(process.env.REACT_APP_GKEY);
        
        Geocode.fromLatLng(lat, long).then(
            (response) => {
                // console.log(response.results[0].address_components[5].short_name)
                setISO(response.results[0].address_components[5].short_name)
            },
            (error) => {
              console.error(error);
            }
        );
    }

    useEffect(()=>{
        getPosition()
        fetchActiveProject()
        fetchTotalProject()
        fetchRegions()
        fetchThemes()
    },[])

    useEffect(()=>{
        geo()
        // eslint-disable-next-line
    },[lat,long])

    return (
        <div className = "container">
            <div className = "landing">   
                {/* <Location/> */}

                {/* nav */}
                <div className = "landing_nav">
                    <h1>
                        Charity Hunter
                    </h1>

                    <div className = "landing_navLinks">
                        <p onClick = {executeScroll} style= {{display:"flex" }}>Near you <LocationOn style ={{color: "#097159", fontSize:"inherit", paddingLeft:"5px"}}/></p>
                        <p onClick ={()=>history.push(ROUTES.ABOUT)} >About us</p>
                        
                    </div>
                </div>

                {/* banner / call to action */}
                <div className ="landing__banner">
                    <h1 style ={{fontWeight: 400}}>Lets come together & <p style={{color: "#097159", fontWeight: 200}}>make the world a better place.</p></h1>

                    <p>Through donations, providing aid, helping one another we can all make a difference.</p>

                    <Button style = {{
                        textTransform: "none",
                        background: "#0B7059",
                        color: "white",
                        width: "5rem",
                        fontWeight: "400"
                    }}>
                        Donate
                    </Button>
                </div>
                <div ref={myRef}></div>
                {/* map showing charities near you */}
                <div  className  = "landing__location">

                    <div className = "landing__locationLeft">
                        <h1>
                            Charities near <span style ={{color:"#097159", fontWeight: 700}}>you</span>
                        </h1>

                        <iframe title = "map_pointer" src="https://giphy.com/embed/JTbzTFf5EuAiHb3O9Z" width="100" height="100" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                    </div>
 
                    <GeoLocationMap lat ={lat} long = {long} iso ={iso}/>
                </div>
                
                {/*info  */}
                <div className = "landing__info">
                    <h1>
                        Be a part of the <span style={{color: "#097159"}}>solution</span>
                    </h1>

                    <div className = "landing__infoMain">
                        <div className = "landing__infoMainContent">
                            <h2>{activePrjs}</h2>
                            <p>
                                There are currently {activePrjs} active projects you can be a part of.
                            </p>
                        </div>

                        <div className = "landing__infoMainContent">
                            <h2>{Math.round(totalPrjs/100)*100}+</h2>
                            <p>
                                We have a track record of over {Math.round(totalPrjs/100)*100}+ projects.
                            </p>
                        </div>

                        <div className = "landing__infoMainContent">
                            <h2>100%</h2>
                            <p>
                                All charity organisations are trusted and vetted by the <a style ={{color: "#097159", textDecoration: "none" }}href="https://www.globalgiving.org/">GlobalGiving</a> organisation
                            </p>
                        </div>

                    </div>
                </div>            

                {/* footer */}
                <Footer/>
            </div>  
        </div>
    )
}

export default Landing

