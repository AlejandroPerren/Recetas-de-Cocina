import { Box, Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const UsersLayout = () => {
  return (
    <Container
    maxWidth={false}
    sx={{
      height: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "grey"
    }}
  >
    <Box
      sx={{
        width: '90%',
        maxWidth: 900,
        bgcolor: 'white',
        boxShadow: 3,
        p: 3,
        borderRadius: 2,
      }}
    >
     <Outlet/>   

    </Box>
  </Container>
  )
}

export default UsersLayout