import React from 'react';
import moment from 'moment';
import { Icons } from 'assets';
import StarRating from 'components/starRating';
import { capitalizeFirstLetter, truncatedString } from 'utils';

const Index = ({ data, rating, email, totalEvents, totalReviews }) => {
    const name = `${data?.firstName} ${data?.lastName}`

    return (
        <div className='profile'>
            <div>
                <div className='image'>
                    <img src={Icons.profileAvatar} alt='avatar' />
                </div>
            </div>
            <div className='profile_content'>
                <div className='profile_content_text'>
                    <div className='profile_content_text_box'>
                        <div className='profile_content_text_box_pair'>
                            <h6>Name</h6>
                            {!name.includes("undefined") && (
                                <p>{truncatedString(capitalizeFirstLetter(name))}</p>
                            )}
                        </div>
                        <div className='profile_content_text_box_pair'>
                            <h6>Gender</h6>
                            {data?.gender && (
                                <p>
                                    {capitalizeFirstLetter(data.gender)}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='profile_content_text_box'>
                        <div className='profile_content_text_box_pair'>
                            <h6>Email</h6>
                            <p>{truncatedString(email)}</p>
                        </div>
                        <div className='profile_content_text_box_pair'>
                            <h6>Location</h6>
                            <p>
                                {data?.address}
                            </p>
                        </div>
                    </div>
                    <div className='profile_content_text_box'>
                        <div className='profile_content_text_box_pair'>
                            <h6>Phone</h6>
                            <p>{data?.phoneNumber}</p>
                        </div>
                        <div className='profile_content_text_box_pair'>
                            <h6>Total events</h6>
                            <p>{totalEvents}</p>
                        </div>
                    </div>
                    <div className='profile_content_text_box'>
                        <div className='profile_content_text_box_pair'>
                            <h6>Date of birth</h6>
                            {data?.dob && (
                                <p>{moment(data.dob).format("DD-MM-YYYY")}</p>
                            )}
                        </div>
                        <div className='profile_content_text_box_pair'>
                            <h6>Rating</h6>
                            <div className='rating'>
                                <StarRating
                                    maxRating={5}
                                    rating={rating}
                                />
                                {rating !== undefined && (
                                    <p>
                                        {rating.toFixed(2)} based on {totalReviews} reviews
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index