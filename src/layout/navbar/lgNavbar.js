import React from 'react';
import { Icons } from 'assets';
import Badge from '@mui/material/Badge';
import { StyledLgNavbar } from './style';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate()
    const { filePath } = useSelector((state) => state.profileReducers.viewProfile)
    const { data } = useSelector((state) => state.notificationsReducers.unreadCounter)

    return (
        <StyledLgNavbar>
            <div className='right'>
                <Badge
                    max={10}
                    color="success"
                    badgeContent={data}
                >
                    <button
                        type='button'
                        className='bell-icon'
                        onClick={() => navigate('/notifications')}
                    >
                        <img
                            alt="bell-icon"
                            src={Icons.bell}
                        />
                    </button>
                </Badge>
                <div className='logo'>
                    {filePath && (
                        <img src={filePath} alt='logo' />
                    )}
                </div>
            </div>
        </StyledLgNavbar>
    )
}

export default Index