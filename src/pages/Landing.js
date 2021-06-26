import axios from 'axios';
import React, { useEffect } from 'react'
import Location from '../components/Location';

const CHARITY_KEY = process.env.REACT_APP_GLOBAL_GIVING_KEY

function Landing() {

    async function fetchActiveProject(){
        const response = await axios.get(`https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=${CHARITY_KEY}`)
        console.log(response.data.projects)
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

    useEffect(()=>{
        fetchActiveProject()
        fetchRegions()
        fetchThemes()
    },[])

    return (
        <div>
            <div className = "pageCenter">   
                <Location/>
            </div>
        </div>
    )
}

export default Landing

