import React from 'react';
import { Icons } from 'assets';
import Dialog from '@mui/material/Dialog';
import { mainColor } from 'styles/global';
import { StyledDialogContent } from './style';
import { useMediaQuery } from 'react-responsive';
import IconButton from '@mui/material/IconButton';

const Index = ({ open, content, setOpen }) => {
    const isMobile = useMediaQuery({ maxWidth: 425 })

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                style: {
                    borderRadius: '6px',
                    background: '#2C2C2C',
                    padding: '0px 32px 36px',
                    boxShadow: `0px 0px 2px 0px #${mainColor}`,

                    ...(isMobile && {
                        padding: '0 16px 18px',
                    }),
                },
            }}
        >
            <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{
                    top: 16,
                    right: 16,
                    padding: 0,
                    position: 'absolute',
                }}
            >
                <img src={Icons.popUpCross} alt='cross-icon' />
            </IconButton>
            <StyledDialogContent>
                {content}
            </StyledDialogContent>
        </Dialog>
    )
}

export default Index