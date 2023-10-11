import React, { useEffect } from 'react';
import { Icons } from 'assets';
import LayoutContent from 'layout';
import { useDispatch, useSelector } from 'react-redux';
import { bookingDetails } from 'redux/bookings/actions';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { capitalizeFirstLetter, getPricingOption, statusColors, truncatedString } from 'utils';
import { StyledBookedServiceDetails, StyledLoadingContainer, StyledMainHeading, StyledStatus } from 'styles/global';

const Index = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { bookingId } = useParams()
    const { loading, data } = useSelector((state) => state.bookingsReducers.details)
    const { firstName: cusFirstName, lastName: cusLastName } = data?.user?.profile || {}
    const { firstName: serProvFirstName, lastName: serProvLastName } = data?.providerService?.user?.profile || {}
    const cusProvName = `${cusFirstName} ${cusLastName}`
    const serProvName = `${serProvFirstName} ${serProvLastName}`

    const getStatus = (str) => {
        return str?.split("_")[0]
    }

    useEffect(() => {
        dispatch(bookingDetails(bookingId))
    }, [bookingId, dispatch])

    return (
        <LayoutContent>
            <StyledBookedServiceDetails>
                <div className='header'>
                    <StyledMainHeading>Booked service details</StyledMainHeading>
                    <button
                        type='button'
                        onClick={() => navigate(-1)}
                    >
                        <img src={Icons.backBtn} alt='back-arrow' />
                    </button>
                </div>
                <div className='details-content'>
                    {loading ? (
                        <StyledLoadingContainer>
                            <CircularProgress />
                        </StyledLoadingContainer>
                    ) : (
                        <React.Fragment>
                            <div className='details-content_bookingId'>
                                <p>Booking id: <span>{data?.uniqueId}</span></p>
                            </div>
                            <div className='details-content_capacity'>
                                <div className='location'>
                                    <h2
                                        className='heading'
                                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                        onClick={() => navigate(`/service/viewDetails/${data.id}`)}
                                    >
                                        {data?.providerService?.name}
                                        {data?.capacity && (
                                            <span>(Capacity {data.capacity})</span>
                                        )}
                                    </h2>
                                    {data?.bookedState && (
                                        <StyledStatus
                                            className='status'
                                            color={statusColors[data && getStatus(data.bookedState)]?.color}
                                            bg={statusColors[data && getStatus(data.bookedState)]?.background}
                                        >
                                            {capitalizeFirstLetter(getStatus(data?.bookedState))}
                                        </StyledStatus>
                                    )}
                                </div>
                                <div className='provider'>
                                    <div className='emoji'>
                                        <img src={Icons.emoji} alt='emoji' />
                                    </div>
                                    <div className='text'>
                                        {!serProvName.includes("undefined") && (
                                            <p
                                                onClick={() => navigate(`/service-provider/viewDetails/${data.providerService.user.id}`)}
                                            >
                                                {truncatedString(capitalizeFirstLetter(serProvName))}
                                            </p>
                                        )}
                                        <span>(Service Provider)</span>
                                    </div>
                                </div>
                            </div>
                            <div className='details-content_customer'>
                                <div className='emoji'>
                                    <img src={Icons.emoji} alt='emoji' />
                                </div>
                                <div className='text'>
                                    {!cusProvName.includes("undefined") && (
                                        <p
                                            onClick={() => navigate(`/customer/viewDetails/${data.user.id}`)}
                                        >
                                            {truncatedString(capitalizeFirstLetter(cusProvName))}
                                        </p>
                                    )}
                                    <span>(Customer)</span>
                                </div>
                            </div>
                            <div className='details-content_location'>
                                <div>
                                    <img src={Icons.location} alt='location' />
                                    <span>{data.location}</span>
                                </div>
                                <div>
                                    <h2>
                                        €{data.providerService?.price}
                                        <span>{getPricingOption(data?.providerService?.pricingOption)}</span>
                                    </h2>
                                </div>
                            </div>
                            {data?.providerService?.pricingOption === 'PER_HOUR' && (
                                <div className='details-content_pricePerHour'>
                                    <p>Service hours:</p>
                                    <div>
                                        <span className='hour'>7*€{data.providerService.price} = </span>
                                        <span className='total'>€140</span>
                                    </div>
                                </div>
                            )}
                            <div className='details-content_description'>
                                <h2 className='heading'>
                                    Description
                                </h2>
                                <p>
                                    {data.description}
                                </p>
                            </div>
                            <div className='details-content_totalAmount'>
                                <h2>
                                    €20
                                    <span>(Total amount received)</span>
                                </h2>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </StyledBookedServiceDetails>
        </LayoutContent>
    )
}

export default Index