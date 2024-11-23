'use client';
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";


interface NavUserMenuProps {
    settings: string[];
    routes?: string[];   
}

export default function NavUserMenu({settings, routes}: NavUserMenuProps) {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const router = useRouter();

       const handleCloseUserMenu = (index?: number, routes?: string[]) => {
        setAnchorElUser(null);
        if (index !== undefined && routes && routes[index]) {
            router.push(routes[index]);
        }
    };
    return (<>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu()}
            >
                {settings.map((setting, index) => (
                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(index, routes)}>
                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>


    </>)
}