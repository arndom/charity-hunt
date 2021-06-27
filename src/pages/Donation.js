import { Box } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import axios from 'axios'
import React, { useState,  useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '../components/Card'
import Footer from '../components/Footer'
import * as ROUTES from "../constants/routes"

const CHARITY_KEY = process.env.REACT_APP_GLOBAL_GIVING_KEY

function Donation() {

    const history = useHistory()

    const [prjs, setPrjs] = useState([]);

    const [regions, setRegions] = useState([]);

    const [themes, setThemes] = useState([]);

    const [value, setValue] = React.useState('default');

    const [options, setOptions] = useState([]);

    async function fetchActiveProject(){
        const response = await axios.get(`https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=${CHARITY_KEY}`)
        // console.log(response.data.projects)
        // console.log(response.data.projects.numberFound)
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
        setPrjs(response.data.projects.project.map(
            (project) => { 
                return{
                    id: project.id,
                    image: project.image.imagelink[3].url,
                    urlCause:project.organization.url,
                    projectLink: project.projectLink,
                    summary: project.summary,
                    themes: project.themes.theme,
                    title: project.title,
                    region: project.region
                }
            }
        ))
    }

    async function fetchRegions(){
        // const response  = await axios.get(`https://api.globalgiving.org/api/public/projectservice/regions?api_key=${CHARITY_KEY}`)
        // console.log(response.data.regions.region.map(
        //     (region) => region.name
        // ))
        // setRegions(response.data.regions.region.map(
        //     (region) => region.name
        // ))

        const response = await axios.get(`https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=${CHARITY_KEY}`)
        // console.log(response.data.projects)
        // console.log(response.data.projects.numberFound)
        console.log(response.data.projects.project.map(
            (project) => project.iso3166CountryCode

        ))
        setRegions(response.data.projects.project.map(
            (project) => project.iso3166CountryCode

        ))
        

    }

    async function fetchThemes(){
        const response  = await axios.get(`https://api.globalgiving.org/api/public/projectservice/themes?api_key=${CHARITY_KEY}`)
        // console.log(response.data.themes.theme.map(
        //     (theme) => theme.name
        // ))
        setThemes(response.data.themes.theme.map(
            (theme) => theme.id
        ))
    }

    async function fetchThemeProject(val){
        const response  = await axios.get(`https://api.globalgiving.org/api/public/projectservice/themes/${val}/projects/active?api_key=${CHARITY_KEY}`)
        // console.log(response.data.projects.project.map(
        //     (project) => { 
        //         return{
        //             id: project.id,
        //             image: project.image.imagelink[3].url,
        //             latitude: project.latitude,
        //             longitude: project.longitude,
        //             need: project.need,
        //             urlCause:project.organization.url,
        //             projectLink: project.projectLink,
        //             summary: project.summary,
        //             themes: project.themes.theme,
        //             title: project.title,
        //             longTermImpact:project.longTermImpact,
        //             logo: project.organization.logoUrl,
        //             region: project.region ,
        //             isoCountry: project.iso3166CountryCode
        //         }
        //     }
        // ))
        setPrjs(response.data.projects.project.map(
            (project) => { 
                return{
                    id: project.id,
                    image: project.image.imagelink[3].url,
                    urlCause:project.organization.url,
                    projectLink: project.projectLink,
                    summary: project.summary,
                    themes: project.themes.theme,
                    title: project.title,
                    region: project.region
                }
            }
        ))
    }

    // async function fetchRegionProject(val){
    //     const response  = await axios.get(`https://api.globalgiving.org/api/public/projectservice/countries/${val}/projects/active?api_key=${CHARITY_KEY}`)
    //     // console.log(response.data.projects.project.map(
    //     //     (project) => { 
    //     //         return{
    //     //             id: project.id,
    //     //             image: project.image.imagelink[3].url,
    //     //             latitude: project.latitude,
    //     //             longitude: project.longitude,
    //     //             need: project.need,
    //     //             urlCause:project.organization.url,
    //     //             projectLink: project.projectLink,
    //     //             summary: project.summary,
    //     //             themes: project.themes.theme,
    //     //             title: project.title,
    //     //             longTermImpact:project.longTermImpact,
    //     //             logo: project.organization.logoUrl,
    //     //             region: project.region ,
    //     //             isoCountry: project.iso3166CountryCode
    //     //         }
    //     //     }
    //     // ))
    //     setPrjs(response.data.projects.project.map(
    //         (project) => { 
    //             return{
    //                 id: project.id,
    //                 image: project.image.imagelink[3].url,
    //                 urlCause:project.organization.url,
    //                 projectLink: project.projectLink,
    //                 summary: project.summary,
    //                 themes: project.themes.theme,
    //                 title: project.title,
    //                 region: project.region
    //             }
    //         }
    //     ))
    // }


    const handleChange = (event) => {
      setValue(event.target.value);
    };

    useEffect(()=>{
        fetchActiveProject()
        fetchRegions()
        fetchThemes()
    },[])

    useEffect(()=>{
        if(value === "region"){
            setOptions(regions)
            console.log(value)
        }
        if(value === "theme"){
            setOptions(themes)
            console.log(value)
        }
    },[regions, themes ,value])

    

    return (
        <div className = "container">
            <Box
                className = "donation"
                // width = "100%"
                height =  "70vh"
                width = "80vw"
                display= "flex"
                flexDirection = "column"
                justifyContent = "space-between"

                style={{
                    background:"white",
                    borderRadius: "5px",
                    padding: "3rem 5%" 
                }}
            >   
                <Box className = "donationContent"
                    display = "flex"
                    flexDirection = "column"
                >
                    <Box width = "100%" display = "flex" alignItems = "center" marginBottom ="1.75rem">
                        <h3 onClick = {()=>history.push(ROUTES.LANDING)}><LocationOn style ={{color: "#097159", fontSize:"5rem", cursor:"pointer"}}/></h3>
                        
                        <Box marginLeft ="15%" marginRight= "5%">
                            <FormControl component="fieldset">
                            <FormLabel component="legend">Filter by</FormLabel>
                            <RadioGroup  aria-label="filterGroup" name="filter" value={value} onChange={handleChange}>
                                <FormControlLabel value="region" disabled control={<Radio />} label="Region" />
                                <FormControlLabel value="theme" control={<Radio />} label="Theme" />
                            </RadioGroup>
                            </FormControl>
                        </Box>

                        <Box>
                            <Autocomplete
                                onChange={ (event, value) => {
                                    fetchThemeProject(value) 
                                } }

                                id="filter_bar"
                                options={options}
                                getOptionLabel={(option) => option} 
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="filtered" variant="outlined" />}
                            />
                        </Box>
                    </Box>

                    <Box 
                        display = "flex"
                        flexWrap = "wrap"
                        justifyContent = "space-around"
                        alignItems = "center"
                    >
                        {
                            prjs.map((prj) => {
                                return(
                                    <Card
                                        logo= {prj.image}
                                        projectLink = {prj.projectLink}
                                        url ={prj.urlCause}
                                        themes = {prj.themes}
                                        // summary = {prj.summary}
                                        title = {prj.title}
                                        style={{width: "30%"}}
                                    />
                                )
                            })
                        }
                    </Box>
                </Box>
                
                <Box 
                    marginBottom = "-3rem"
                >
                    <Footer/>
                </Box>
            </Box>
        </div>
    )
}

export default Donation
