import React from 'react';
import { PrimaryButton } from 'styles/global';
import { useNavigate } from 'react-router-dom';
import StyledAuthBox from 'components/authBox';

const Index = () => {
    const navigate = useNavigate()

    return (
        <StyledAuthBox>
            <div className='text'>
                <h3>Password changed</h3>
                <p>Your password has been changed successfully</p>
            </div>
            <div className="btn-container">
                <PrimaryButton
                    type='button'
                    onClick={() => navigate("/")}
                >
                    Login
                </PrimaryButton>
            </div>
        </StyledAuthBox>
    )
}

export default Index