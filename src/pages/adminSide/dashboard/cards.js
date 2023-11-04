import React, { useEffect } from 'react';
import { Icons } from 'assets';
import { StyledCards } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { normalGrey } from 'styles/global';
import { shortestFormatNumber } from 'utils';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { cardCounter } from 'redux/cardsCounter/actions';

const Index = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data, loading } = useSelector((state) => state.cardCounterReducers.cardCounter)

    useEffect(() => {
        dispatch(cardCounter())
    }, [dispatch])

    return (
        <StyledCards>
            {loading ? (
                <Skeleton
                    height={120}
                    sx={{ bgcolor: normalGrey }}
                />
            ) : (
                <div className='card' onClick={() => navigate('/customers')}>
                    <div className='card_detail'>
                        <p>{data?.customersCount}</p>
                        <h3>Registered customers</h3>
                    </div>
                    <div className='card_icon'>
                        <img src={Icons.customers} alt='customers' />
                    </div>
                </div>
            )}

            {loading ? (
                <Skeleton
                    height={120}
                    sx={{ bgcolor: normalGrey }}
                />
            ) : (
                <div className='card' onClick={() => navigate('/service-providers')}>
                    <div className='card_detail'>
                        <p>{data?.serviceProviderCount}</p>
                        <h3>Service providers</h3>
                    </div>
                    <div className='card_icon'>
                        <img src={Icons.serProviders} alt='serProviders' />
                    </div>
                </div>
            )}

            {loading ? (
                <Skeleton
                    height={120}
                    sx={{ bgcolor: normalGrey }}
                />
            ) : (
                <div className='card' onClick={() => navigate('/services')}>
                    <div className='card_detail'>
                        <p>{data?.servicesCount}</p>
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
                    sx={{ bgcolor: normalGrey }}
                />
            ) : (
                <div className='card' onClick={() => navigate('/requests')}>
                    <div className='card_detail'>
                        <p>{data?.providerPendingRequestCount}</p>
                        <h3>Pending applications</h3>
                    </div>
                    <div className='card_icon'>
                        <img src={Icons.pendingApplications} alt='pendingApplications' />
                    </div>
                </div>
            )}

            {loading ? (
                <Skeleton
                    height={120}
                    sx={{ bgcolor: normalGrey }}
                />
            ) : (
                <div className='card' onClick={() => navigate('/bookings')}>
                    <div className='card_detail'>
                        <p>{data?.bookedServiceCount}</p>
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
                    sx={{ bgcolor: normalGrey }}
                />
            ) : (
                <div className='card' onClick={() => navigate('/earnings')}>
                    <div className='card_detail'>
                        <p>€{shortestFormatNumber(data?.totalRevenue)}</p>
                        <h3>Total revenue</h3>
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