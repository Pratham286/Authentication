import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export default function Home() {
    // function handleClick()

    const navigate = useNavigate();
  return (
    <Box>
        <Button onClick={() => navigate("/signup")} variant="contained" sx={{margin: "5px"}} >Signup</Button>
        <Button onClick={() => navigate("/login")} variant="contained" sx={{margin: "5px"}} >Login</Button>
    </Box>
  )
}
