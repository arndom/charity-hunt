import { Box } from '@material-ui/core'
import React from 'react'

function Card({logo, projectLink, url, title, themes}) {
    return (
        <div className ='cardMain'>   

            <Box
                width = "100%"
                height = "60%"
                margin = "auto"
            >
                <img src = {logo} alt = "" />
            </Box>

            <div className = 'cardMain__info'>

                <h2>{title}</h2>

                <Box
                    display = "flex"
                    marginTop = "0.5rem"
                    paddingBottom = "0.1rem"
                    justifyContent = "center"
                >
                    <h3 style = {{margin: "0 .5rem",width: "3rem",display: "flex", justifyContent: "center", background: "#594D43", padding: '0.2rem 0.5rem', borderRadius: "2px"}}><a target = "_blank"  rel="noreferrer" style={{color: "white", textDecoration: "none", fontSize:".65rem"}} href = {url }>Visit</a></h3>
                    <h3 style = {{margin: "0 .5rem",width: "3rem",display: "flex", justifyContent: "center",background: "#0B7059", padding: '0.2rem 0.5rem', borderRadius: "2px"}}><a target = "_blank"  rel="noreferrer" style={{color: "white", textDecoration: "none", fontSize:".65rem"}} href = {projectLink}>Donate</a></h3>
                </Box>
                
                <Box
                    className = "tags"
                    display = "flex"
                    justifyContent = "center"
                    fontSize = "x-small"
                    style ={{
                        overflowX: "scroll",
                    }}
                >
                        {
                            themes.map((theme)=>{
                                return(
                                    <p style={{padding: "0 .5rem", margin: "0 .5rem"}}>{theme.id}</p>
                                )
                            })
                        }                        
                </Box>
            </div>
        </div>
    )
}

export default Card
