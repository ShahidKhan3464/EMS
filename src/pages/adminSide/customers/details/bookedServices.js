import React from 'react';
import { Icons } from 'assets';
import { capitalizeFirstLetter } from 'utils';
import { useNavigate } from 'react-router-dom';
import { StyledBookedServices } from './style';
import { StyledNoResultsFound } from 'styles/global';

const Index = ({ id, booking }) => {
    const navigate = useNavigate()
    const noResultsFound = booking.length === 0

    return (
        <StyledBookedServices>
            <div className='services-content'>
                <h2 className='services-content_heading'>
                    Booked services
                </h2>
                <div className='services-content_list'>
                    {noResultsFound ? (
                        <StyledNoResultsFound>
                            <div className='box'>
                                <img src={Icons.notFound} alt='no-result-found' />
                                <h3>No booking found</h3>
                            </div>
                        </StyledNoResultsFound>
                    ) : (
                        booking.map((item, index) => (
                            <div
                                key={index}
                                className='services-content_list_item'
                                onClick={() => navigate(`/customer/viewDetails/${id}/bookedServiceDetails/${item.id}`)}
                            >
                                <div className='left'>
                                    <img src={Icons.hipHop} alt='hipHop' />
                                    <div className='data'>
                                        <p className='name'>{capitalizeFirstLetter(item.name)}</p>
                                        <div>
                                            <img src={Icons.location} alt='location' />
                                            <span>{item.location}</span>
                                        </div>
                                        <p className='price'>€{item.providerService.price}</p>
                                    </div>
                                </div>
                            </div>
                        )))}
                </div>
            </div>
        </StyledBookedServices>
    )
}

export default Index