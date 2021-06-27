import { Box } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root:{
        color: "white",
        background: "linear-gradient(to right, #000000, #434343)",
        // background: "#817062"
    }
})

function Footer() {
    const classes = useStyles()

    return (
        <Box
            className = {classes.root}
            // width = "100%"
            // height = "8vh"
            padding= " 15px 0"
            display = "flex"
            flexDirection= "column"
            justifyContent = "center"
            alignItems = "center"
            fontSize = "small"
            fontWeight = "500"
            marginRight = "-7%"
            marginLeft = "-7%"
        >
            <p>Powered by <a href="https://www.globalgiving.org/" target = "_blank"  rel="noreferrer" style={{color: "white", textDecoration: "none"}}>GlobalGiving</a></p>

            <p style ={{display:"flex", alignItems: "center"}}>If you liked it, smash the star on github<a class = "pulse" href="https://github.com/arndom/charity-hunt" target = "_blank"  rel="noreferrer" style={{color: "white", fontSize: "1.25rem", textDecoration: "none", textAlign: "center"}}>🌟</a></p>
            
            <p>Built with 💖 by <a href="https://github.com/arndom" target = "_blank"  rel="noreferrer" style={{color: "white", textDecoration: "underline"}}>arndom</a></p>
        </Box>
    )
}

export default Footer