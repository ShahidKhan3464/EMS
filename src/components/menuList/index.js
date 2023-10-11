import React, { useState } from 'react';
import { Icons } from 'assets';
import Menu from '@mui/material/Menu';
import { lightGrey } from 'styles/global';
import MenuItem from '@mui/material/MenuItem';
import { useMediaQuery } from 'react-responsive';
import IconButton from '@mui/material/IconButton';

const Index = ({ id = null, reason = null, options, handleTableMenu }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const isMobile = useMediaQuery({ maxWidth: 520 })

    const handleIconButton = (e) => {
        e.stopPropagation()
        setAnchorEl(e.currentTarget)
    }

    const handleMenuItem = (e, option) => {
        setAnchorEl(null)
        e.stopPropagation()
        handleTableMenu(id, option, reason)
    }

    const handleCloseMenu = (e) => {
        setAnchorEl(null)
        e.stopPropagation()
    }

    return (
        <React.Fragment>
            <IconButton
                aria-haspopup="true"
                sx={{ width: '3px' }}
                onClick={handleIconButton}
                aria-expanded={open ? 'true' : undefined}
                aria-controls={open ? 'long-menu' : undefined}
            >
                <img src={Icons.menuAction} alt='menu-icon' />
            </IconButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                MenuListProps={{ style: { padding: 0 } }}
                PaperProps={{
                    style: {
                        width: '132px',
                        color: lightGrey,
                        borderRadius: '10px',
                        background: '#2C2C2C',
                        padding: '16px 16px 0',
                        boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.08)',
                        ...(isMobile && {
                            width: '92px',
                            padding: '8px 8px 0',
                        }),
                    },
                }}
            >
                {options?.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={(e) => handleMenuItem(e, option.value)}
                        sx={{
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '20px',
                            padding: '0 0 18px',
                            fontStyle: 'normal',
                            borderBottom: 'none',
                            fontFamily: 'Poppins',

                            ...(isMobile && {
                                fontSize: '12px',
                                minHeight: '30px',
                                padding: '0 0 5px',
                            }),
                        }}
                    >
                        <span>{option.text}</span>
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
}

export default Index