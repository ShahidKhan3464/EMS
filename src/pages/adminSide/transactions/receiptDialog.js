import React from 'react';
import { Icons } from 'assets';
import ViewReceipt from './receipt';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';

const Index = ({ open, data, setOpen }) => {

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                style: {
                    width: '100%',
                    overflowY: 'hidden',
                    borderRadius: '6px',
                    backgroundColor: '#2C2C2C',
                    boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.08)',
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
                    '@media screen and (max-width: 520px)': {
                        top: 12,
                        right: 8,
                    }
                }}
            >
                <img src={Icons.popUpCross} alt='cross-icon' />
            </IconButton>
            <ViewReceipt data={data} />
        </Dialog>
    )
}

export default Index