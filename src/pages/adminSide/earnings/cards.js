import React, { useState } from 'react';
import { Icons } from 'assets';
import { StyledCards } from './style';
import { normalGrey } from 'styles/global';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    return (
        <StyledCards>
            {loading ? (
                <Skeleton
                    height={120}
                    animation="wave"
                    sx={{ bgcolor: normalGrey }}
                />
            ) : (
                <div
                    className='card'
                    onClick={() => navigate('/services')}
                >
                    <div className='card_detail'>
                        <p>200</p>
                        <h3>Services</h3>
                    </div>
                    <div className='card_icon'>
                        <img src={Icons.services} alt='services' />
                    </div>
                </div>
            )}

            {loading ? (
                <Skeleton
                    height={120}
                    animation="wave"
                    sx={{ bgcolor: normalGrey }}
                />
            ) : (
                <div className='card' onClick={() => navigate('/bookings')}>
                    <div className='card_detail'>
                        <p>300</p>
                        <h3>Booked services</h3>
                    </div>
                    <div className='card_icon'>
                        <img src={Icons.bookedService} alt='bookedService' />
                    </div>
                </div>
            )}

            {loading ? (
                <Skeleton
                    height={120}
                    animation="wave"
                    sx={{ bgcolor: normalGrey }}
                />
            ) : (
                <div className='card' onClick={() => navigate('/earnings')}>
                    <div className='card_detail'>
                        <p>$3.9k</p>
                        <h3>Total Revenue</h3>
                    </div>
                    <div className='card_icon'>
                        <img src={Icons.totalRevenue} alt='totalRevenue' />
                    </div>
                </div>
            )}
        </StyledCards>
    )
}

export default Index