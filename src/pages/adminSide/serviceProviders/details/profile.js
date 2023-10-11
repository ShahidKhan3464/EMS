import React, { useState } from 'react';
import { Icons } from 'assets';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom';
import StarRating from 'components/starRating';
import IconButton from '@mui/material/IconButton';
import { StyledVatCertificate } from 'styles/global';
import { capitalizeFirstLetter, truncatedString } from 'utils';

const Index = ({ id, rating, email, profile, noOfOrder, noOfServices, vatCer }) => {
    const navigate = useNavigate()
    const { firstName, lastName } = profile ?? {}
    const name = `${firstName} ${lastName}`
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <React.Fragment>
            {dialogOpen && (
                <Dialog
                    fullScreen
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    PaperProps={{
                        style: {
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    }}
                >
                    <IconButton
                        onClick={() => setDialogOpen(false)}
                        sx={{
                            top: 16,
                            right: 16,
                            padding: 0,
                            position: 'absolute',
                        }}
                    >
                        <img src={Icons.popUpCross} alt='cross-icon' />
                    </IconButton>
                    <StyledVatCertificate>
                        <img src={vatCer} alt="certificate" />
                    </StyledVatCertificate>
                </Dialog>
            )}
            <div className='profile'>
                <div>
                    <div className='image'>
                        <img src={Icons.profileAvatar} alt='avatar' />
                    </div>
                    {/* <StyledStatus
                    bg={'#FFF'}
                    color={'#22C55E'}
                >
                    Available
                </StyledStatus> */}
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
                                <h6>No of services</h6>
                                <p>{noOfServices}</p>
                            </div>
                            <div className='profile_content_text_box_pair'>
                                <h6>Booking Details</h6>
                                <button
                                    type='button'
                                    className='view-btn'
                                    onClick={() => navigate(`/service-provider/bookingDetails/${id}`)}
                                >
                                    View
                                </button>
                            </div>
                        </div>
                        <div className='profile_content_text_box'>
                            <div className='profile_content_text_box_pair'>
                                <h6>Email</h6>
                                <p>{truncatedString(email)}</p>
                            </div>
                            <div className='profile_content_text_box_pair'>
                                <h6>Location</h6>
                                <p>{profile?.address}</p>
                            </div>
                            <div className='profile_content_text_box_pair'>
                                <h6>VAT Certificate</h6>
                                <button
                                    type='button'
                                    className='view-btn'
                                    onClick={() => setDialogOpen(true)}
                                >
                                    View
                                </button>
                            </div>
                        </div>
                        <div className='profile_content_text_box'>
                            <div className='profile_content_text_box_pair'>
                                <h6>Phone</h6>
                                <p>{profile?.phoneNumber}</p>
                            </div>
                            <div className='profile_content_text_box_pair'>
                                <h6>Income</h6>
                                <p>€10,000</p>
                            </div>
                        </div>
                        <div className='profile_content_text_box'>
                            <div className='profile_content_text_box_pair'>
                                <h6>No of orders received</h6>
                                <p>{noOfOrder}</p>
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
                                            {rating.toFixed(2)}
                                            {/* based on 250 reviews */}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Index