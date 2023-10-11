import React, { useState } from 'react';
import { Icons } from 'assets';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { StyledVatCertificate } from 'styles/global';
import { capitalizeFirstLetter, truncatedString } from 'utils';

const Index = ({ email, profile, vatCer }) => {
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
                                <h6>Email</h6>
                                <p>{truncatedString(email)}</p>
                            </div>
                            <div className='profile_content_text_box_pair'>
                                <h6>Location</h6>
                                <p>{profile?.address}</p>
                            </div>
                        </div>
                        <div className='profile_content_text_box'>
                            <div className='profile_content_text_box_pair'>
                                <h6>Phone</h6>
                                <p>{profile?.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Index