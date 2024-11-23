'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import NavLogo from './navLogo';
import NavPages from './navPages';
import NavUserMenu from './navUserMenu';

interface NavbarCoreProps {
  children: React.ReactNode;
}

export default function NavbarCore({children} : NavbarCoreProps) {
  return (
    <AppBar position="static" sx={{backgroundColor:'white', color:"black"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        {children}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

