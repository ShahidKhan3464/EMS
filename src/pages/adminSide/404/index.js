import React from 'react';
import { useDispatch } from 'react-redux';
import { StyledPageNotFound } from './style';
import { ADMIN_SIGNOUT } from 'redux/auth/types';
import { PRICE_GUIDE_RESET } from 'redux/priceGuide/types';
import { PrimaryButton, StyledMainHeading } from 'styles/global';
import { BOOKINGS_RESET, BOOKING_DETAILS_RESET } from 'redux/bookings/types';
import { REPORTS_RESET, REPLY_REPORT_RESET, CLOSE_REPORT_RESET } from 'redux/reports/types';
import { CHANGE_EMAIL_RESET, CHANGE_PASSWORD_RESET, VERIFY_PASSWORD_RESET } from 'redux/profile/types';
import { CHANGE_SERVICE_STATUS_RESET, SERVICES_RESET, SERVICE_DETAILS_RESET } from 'redux/services/types';
import { CUSTOMERS_RESET, CUSTOMER_BLOCK_UNBLOCK_RESET, CUSTOMER_DETAILS_RESET } from 'redux/customers/types';
import { ADD_FAQ_RESET, CLOSE_QUERY_RESET, DELETE_FAQ_RESET, FAQS_RESET, QUERIES_RESET, REPLY_QUERY_RESET, UPDATE_FAQ_RESET } from 'redux/help/types';
import { SERVICE_PROVIDERS_RESET, SERVICE_PROVIDER_APPROVAL_RESET, SERVICE_PROVIDER_BLOCK_UNBLOCK_RESET, SERVICE_PROVIDER_BOOKING_DETAILS_RESET, SERVICE_PROVIDER_DETAILS_RESET } from 'redux/serviceProviders/types';


const Index = () => {
    const dispatch = useDispatch()

    const handlePageNotFound = async () => {
        await dispatch({ type: FAQS_RESET })
        await dispatch({ type: ADMIN_SIGNOUT })
        await dispatch({ type: ADD_FAQ_RESET })
        await dispatch({ type: QUERIES_RESET })
        await dispatch({ type: REPORTS_RESET })
        await dispatch({ type: SERVICES_RESET })
        await dispatch({ type: BOOKINGS_RESET })
        await dispatch({ type: CUSTOMERS_RESET })
        await dispatch({ type: UPDATE_FAQ_RESET })
        await dispatch({ type: DELETE_FAQ_RESET })
        await dispatch({ type: PRICE_GUIDE_RESET })
        await dispatch({ type: CLOSE_QUERY_RESET })
        await dispatch({ type: REPLY_QUERY_RESET })
        await dispatch({ type: CHANGE_EMAIL_RESET })
        await dispatch({ type: REPLY_REPORT_RESET })
        await dispatch({ type: CLOSE_REPORT_RESET })
        await dispatch({ type: BOOKING_DETAILS_RESET })
        await dispatch({ type: VERIFY_PASSWORD_RESET })
        await dispatch({ type: CHANGE_PASSWORD_RESET })
        await dispatch({ type: SERVICE_DETAILS_RESET })
        await dispatch({ type: CUSTOMER_DETAILS_RESET })
        await dispatch({ type: SERVICE_PROVIDERS_RESET })
        await dispatch({ type: CHANGE_SERVICE_STATUS_RESET })
        await dispatch({ type: CUSTOMER_BLOCK_UNBLOCK_RESET })
        await dispatch({ type: SERVICE_PROVIDER_DETAILS_RESET })
        await dispatch({ type: SERVICE_PROVIDER_APPROVAL_RESET })
        await dispatch({ type: SERVICE_PROVIDER_BLOCK_UNBLOCK_RESET })
        await dispatch({ type: SERVICE_PROVIDER_BOOKING_DETAILS_RESET })
        setTimeout(() => {
            window.location.href = "/"
        }, 100)
    }

    return (
        <StyledPageNotFound>
            <div className='content'>
                <StyledMainHeading>404 - Page Not Found</StyledMainHeading>
                <PrimaryButton
                    type='button'
                    onClick={handlePageNotFound}
                >
                    Go back to the homepage
                </PrimaryButton>
            </div>
        </StyledPageNotFound>
    )
}

export default Index