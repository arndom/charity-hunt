import { Box } from '@material-ui/core'
import React from 'react'

function MiniMapCard({logo, projectLink, url, title}) {
    return (
        <div className ='card'>   
            <img src = {logo} alt = "" />
            <div className = 'card__info'>
                    <h2>{title}</h2>

                    <Box
                        display = "flex"
                        justifyContent ="space-around"
                        marginTop = "0.5rem"
                        paddingBottom = "0.1rem"
                    >
                        <h3 style = {{background: "#0B7059", padding: '0.2rem 0.5rem', borderRadius: "5px"}}><a target = "_blank"  rel="noreferrer" style={{color: "white", textDecoration: "none", fontSize:".65rem"}} href = {url }>Visit</a></h3>
                        <h3 style = {{background: "#0B7059", padding: '0.2rem 0.5rem', borderRadius: "5px"}}><a target = "_blank"  rel="noreferrer" style={{color: "white", textDecoration: "none", fontSize:".65rem"}} href = {projectLink}>Donate</a></h3>
                    </Box>

                    {/* will use in big card */}
{/* 
                    <Box>
                        {
                            themes.map((theme)=>{
                                return(
                                    <p>{theme.name}</p>
                                )
                            })
                        }                        
                    </Box> */}

            
            </div>
        </div>
    )
}

export default MiniMapCard
