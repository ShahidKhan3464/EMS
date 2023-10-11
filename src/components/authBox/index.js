import React from 'react';
import { Icons, Images } from 'assets';
import { StyledAuthBox } from './style';
import Container from '@mui/material/Container';

const Index = ({ children }) => {

    return (
        <StyledAuthBox>
            <Container>
                <div className='content'>
                    <div className='content_bg-img'>
                        <div className='logo'>
                            <img src={Icons.logo} alt='logo' />
                            <span className='logo-text'>Be ArtEvent</span>
                        </div>
                        <div className='vector-img'>
                            <img src={Images.vector} alt='vector' />
                        </div>
                    </div>
                    <div className='content_children'>
                        {children}
                    </div>
                </div>
            </Container>
        </StyledAuthBox>
    )
}

export default Index