import React, { useState } from 'react';
import { Icons, Images } from 'assets';
import StarRating from 'components/starRating';
import { StyledServiceDetails } from './style';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledLoadingContainer, StyledStatus } from 'styles/global';
import { capitalizeFirstLetter, getPricingOption, statusColors } from 'utils';

const Index = ({ data, loading }) => {
    const [showAdvancePaymentReason, setShowAdvancePaymentReason] = useState(false)

    const getSender = (sender) => {
        const { firstName, lastName } = sender.profile ?? {}
        return `${firstName} ${lastName}`
    }

    return (
        <StyledServiceDetails>
            {loading ? (
                <StyledLoadingContainer>
                    <CircularProgress />
                </StyledLoadingContainer>
            ) : (
                <div className='details-content'>
                    <div className='details-content_top'>
                        <div>
                            <h2 className='heading'>
                                {data.name}
                                {data?.capacity && (
                                    <span>(Capacity {data.capacity})</span>
                                )}
                            </h2>
                            <StyledStatus
                                className='status'
                                color={statusColors[data.serviceStatus].color}
                                bg={statusColors[data.serviceStatus].background}
                            >
                                {capitalizeFirstLetter(data.serviceStatus)}
                            </StyledStatus>
                        </div>
                        <div className='rating'>
                            <StarRating
                                maxRating={5}
                                rating={data.rating}
                            />
                            <span>
                                {data.rating.toFixed(2)} | {data.feedback.length} reviews
                            </span>
                        </div>
                    </div>
                    <div className='details-content_location'>
                        <div>
                            <img src={Icons.location} alt='location' />
                            <span>{data.serviceAddress}</span>
                        </div>
                        <div>
                            <h2>
                                €{data.price}
                                <span>{getPricingOption(data.pricingOption)}</span>
                            </h2>
                        </div>
                    </div>
                    {data.pricingOption === 'PER_HOUR' && (
                        <div className='details-content_pricePerHour'>
                            <p>Service hours:</p>
                            <div>
                                <span className='hour'>7*€{data.price} = </span>
                                <span className='total'>€140</span>
                            </div>
                        </div>
                    )}
                    {data.advancePayment && (
                        <div
                            className={`details-content_advancePayment ${showAdvancePaymentReason && 'active'}`}
                        >
                            <div
                                className='details-content_advancePayment_top'
                                onClick={() => setShowAdvancePaymentReason(!showAdvancePaymentReason)}
                            >
                                <p>This service required advance payment</p>
                                <div className='showReason-icon'>
                                    <img src={Icons.reason} alt='reason' />
                                </div>
                            </div>
                            <div className='details-content_advancePayment_reason'>
                                <p>Reason: <span>{data.advancePaymentReason}</span></p>
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
                    <div className='details-content_features'>
                        <h2 className='heading'>
                            Features
                        </h2>
                        <ul>
                            {data.feature.map(({ feature }, index) => {
                                return (
                                    <li key={index}>{feature}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='details-content_photos'>
                        <h2 className='heading'>
                            Photos
                        </h2>
                        <div className='services-images'>
                            {data.image.map(({ image }, index) => {
                                return (
                                    <img key={index} src={image} alt='service' />
                                )
                            })}
                        </div>
                    </div>
                    <div className='details-content_videos' style={{ marginTop: '6px' }}>
                        <h2 className='heading'>
                            Videos
                        </h2>
                        <div className='services-videos'>
                            <img src={Images.video1} alt='service' />
                        </div>
                        <ol>
                            {data.videoLink?.map(item => (
                                <li key={item.id}>
                                    <a
                                        href={item.link}
                                        target='no_blank'
                                    >
                                        {item.link}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className='details-content_reviews'>
                        <div className='top'>
                            <h2 className='heading'>
                                Reviews
                            </h2>
                            <button
                                type='button'
                                style={{
                                    cursor: data.feedback?.length === 0 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                View all
                            </button>
                        </div>
                        <div>
                            {data.feedback.map((item, index) => {
                                return (
                                    <div key={index} className='box'>
                                        <div className='box_top'>
                                            <div className='avatar'>
                                                <img src={Icons.rAvatar1} alt='rAvatar' />
                                            </div>
                                            <div className='reviews'>
                                                <span>{getSender(item.sender)}</span>
                                                <div className='stars'>
                                                    <StarRating
                                                        maxRating={5}
                                                        rating={item.rating}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='box_message'>
                                            <p>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </StyledServiceDetails>
    )
}

export default Index