import React, { useEffect } from 'react';
import Cards from './cards';
import Graph from './graph';
import LayoutContent from 'layout';
import { useDispatch } from 'react-redux';
import Notifications from './notifications';
import BookedServices from './bookedService';
import { useNavigate } from 'react-router-dom';
import TransactionsDetails from './transaction';
import { viewProfile } from 'redux/profile/actions';
import { StyledMainContent, StyledHeading } from './style';
import { unreadCounter } from 'redux/notifications/actions';

const Index = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            await dispatch(viewProfile())
            await dispatch(unreadCounter())
        })()
    }, [dispatch])

    return (
        <LayoutContent>
            <StyledMainContent>
                <Cards />
                <div className='graph-notifi'>
                    <Graph />
                    <Notifications />
                </div>
                <div className='tables-container'>
                    <div className='table'>
                        <div className='table_header'>
                            <StyledHeading>Booked services</StyledHeading>
                            <button
                                type='button'
                                onClick={() => navigate('/bookings')}
                            >
                                View all
                            </button>
                        </div>
                        <BookedServices />
                    </div>
                    <div className='table'>
                        <div className='table_header'>
                            <StyledHeading>Transaction details</StyledHeading>
                            <button
                                type='button'
                                onClick={() => navigate('/transactions')}
                            >
                                View all
                            </button>
                        </div>
                        <TransactionsDetails />
                    </div>
                </div>
            </StyledMainContent>
        </LayoutContent>
    )
}

export default Index