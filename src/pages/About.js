import { Box } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../components/Footer'
import * as ROUTES from "../constants/routes"

function About() {

    const history = useHistory()
    return (
        <div className = "container"> 
            <Box
                // width = "100%"
                height =  "70vh"
                width = "80vw"
                display= "flex"
                flexDirection = "column"
                justifyContent = "space-between"

                style={{
                    background:"white",
                    overflow: "hidden",
                    borderRadius: "5px"
                }}
                // alignItems ="center"
            >
                <div style={{display: "flex",flexDirection:"column", alignItems: "center", marginTop: "5rem"}}>

                    <h3 onClick = {()=>history.push(ROUTES.LANDING)}><LocationOn style ={{color: "#097159", fontSize:"5rem", paddingLeft:"5px", paddingBottom: ".8rem", cursor:"pointer"}}/></h3>

                    <h3 style ={{textAlign: "center", width: "65%", fontWeight: 500}}>
                        This app was made as a means a to easiily access trusted charities and be of assistance to people, be it financially,
                        physically or by simply sharing. 
                    </h3>

                </div>
            <Footer/>
            </Box>
        </div>
    )
}

export default About
