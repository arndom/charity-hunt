import { Button } from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

// import Location from '../components/Location';
import GeoLocationMap  from '../components/GeoLocationMap';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Footer from '../components/Footer';

const CHARITY_KEY = process.env.REACT_APP_GLOBAL_GIVING_KEY

function Landing() {

    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);

    const [activePrjs, setActivePrjs] = useState(0);
    const [totalPrjs, setTotalPrjs] = useState(0);

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
                    region: project.region 
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
                console.log(position)
                setLat(position.coords.latitude)
                setLong(position.coords.longitude)
              }
            )
        }else{
            alert("GeoLocation not supported in this browser")
        }

    }

    useEffect(()=>{
        getPosition()
        fetchActiveProject()
        fetchTotalProject()
        fetchRegions()
        fetchThemes()
    },[])

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
                        <p style= {{display:"flex" }}>Near you <LocationOn style ={{color: "#097159", fontSize:"inherit", paddingLeft:"5px"}}/></p>
                        <p>About us</p>
                        
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

                {/* map showing charities near you */}
                <div className  = "landing__location">

                    <div className = "landing__locationLeft">
                        <h1>
                            Charities near <span style ={{color:"#097159", fontWeight: 700}}>you</span>
                        </h1>

                        <iframe title = "map_pointer" src="https://giphy.com/embed/JTbzTFf5EuAiHb3O9Z" width="100" height="100" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                    </div>
 
                    <GeoLocationMap lat ={lat} long = {long}/>
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

