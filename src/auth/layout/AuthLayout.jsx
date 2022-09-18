import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({ children, title = '' }) => {
  return (

    <Grid  
    
    container
    spaicing={ 0 }
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4  }} // style extended, tenemos acceso al theme establecido en el themeProvider
    >
       <Grid item
         className="box-shadow"
         xs={ 3 }
         sx={{ 
            width: { sm: 450 },
            backgroundColor: 'white', 
            padding: 3, 
            borderRadius: 2 
        }}
       >
           <Typography variant="h5" sx={{ mb: 1 }}>{ title }</Typography>

            {/* { chlidren } */}

            { children }

         </Grid>
    /</Grid>
  )
}
