import React from 'react';
import { Icons } from 'assets';
import { mainColor } from 'styles/global';
import Dialog from '@mui/material/Dialog';
import { StyledDialogContent } from './style';
import { useMediaQuery } from 'react-responsive';
import IconButton from '@mui/material/IconButton';

const Index = ({ title, reasonContent, open, setOpen }) => {
    const isMobile = useMediaQuery({ maxWidth: 520 })

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                style: {
                    width: '100%',
                    padding: '24px',
                    overflowY: 'hidden',
                    borderRadius: '6px',
                    background: '#2C2C2C',
                    boxShadow: `0px 0px 2px 0px #${mainColor}`,
                    ...(isMobile && {
                        padding: '15px',
                    }),
                },
            }}
        >
            <StyledDialogContent>
                <div className='content_header'>
                    <h2>{title}</h2>
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpen(false)}
                        sx={{
                            top: 28,
                            right: 24,
                            padding: 0,
                            position: 'absolute',

                            ...(isMobile && {
                                top: 20,
                                right: 12,
                            }),
                        }}
                    >
                        <img src={Icons.popUpCross} alt='cross-icon' />
                    </IconButton>
                </div>
                <div className='content_reason'>
                    {reasonContent}
                </div>
            </StyledDialogContent>
        </Dialog>
    )
}

export default Index