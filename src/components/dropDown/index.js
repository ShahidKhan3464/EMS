import React, { useEffect, useState } from 'react';
import { Icons } from 'assets';
import Menu from '@mui/material/Menu';
import { StyledButton } from './style';
import { lightGrey } from 'styles/global';
import MenuItem from '@mui/material/MenuItem';
import { useMediaQuery } from 'react-responsive';

const Index = ({ resetFilter, name, options, defaultValue, handleFilterChange }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [isSelect, setIsSelect] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 520 })
    const [initialValue, setInitialValue] = useState(defaultValue)
    const open = Boolean(anchorEl)

    const handleMenuItem = (value, text) => {
        setIsSelect(true)
        setAnchorEl(null)
        setInitialValue(text)
        handleFilterChange(name, value)
    }

    const handleClearFilter = (e) => {
        setIsSelect(false)
        e.stopPropagation()
        handleFilterChange(name, '')
        setInitialValue(defaultValue)
    }

    useEffect(() => {
        if (resetFilter) {
            setIsSelect(false)
            setInitialValue(defaultValue)
        }
    }, [resetFilter, defaultValue])

    return (
        <React.Fragment>
            <StyledButton
                selected={isSelect}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ color: !isSelect ? '#919292' : lightGrey }}
                aria-controls={open ? 'demo-customized-menu' : undefined}
                endIcon={!isSelect
                    ? (
                        <img
                            alt='down-arrow'
                            src={Icons.downArrow}
                        />
                    )
                    : (
                        <img
                            alt='clear-filter'
                            src={Icons.clearFilter}
                            onClick={e => handleClearFilter(e)}
                        />
                    )
                }
            >
                {initialValue}
            </StyledButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{ style: { padding: 0 } }}
                PaperProps={{
                    style: {
                        color: lightGrey,
                        borderRadius: '10px',
                        background: '#2C2C2C',
                        padding: '15px 15px 0',
                        boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.08)',

                        ...(isMobile && {
                            padding: '10px 10px 0',
                        }),
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleMenuItem(option.value, option.text)}
                        sx={{
                            gap: '10px',
                            fontSize: '16px',
                            fontWeight: '400',
                            lineHeight: '21px',
                            padding: '0 0 15px',
                            fontStyle: 'normal',
                            borderBottom: 'none',
                            fontFamily: 'Poppins',
                            letterSpacing: '-0.0031em',
                            "&:hover": { backgroundColor: "transparent", color: 'inherit' },

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
    )
}

export default Index