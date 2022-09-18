import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";


const drawerWith = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster' >

        {/* <NavB drawerWith */}
        <NavBar drawerWith={ drawerWith }/>

        {/* Sidebar drawerWith */}
        <SideBar drawerWith={ drawerWith } />

        <Box
            component='main'
            sx={{ flexGrow: 1, padding: 3 }}
        
        >

                <Toolbar/>

                { children }

        </Box>
    </Box>
  )
}
