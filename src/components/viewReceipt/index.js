import React, { useEffect } from 'react';
import moment from 'moment';
import { Icons } from 'assets';
import { StyledReceiptContent } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { StyledLoadingContainer } from 'styles/global';
import CircularProgress from '@mui/material/CircularProgress';
import { transactionDetails } from 'redux/transactions/actions';

const Index = ({ id, componentRef = null }) => {
    const dispatch = useDispatch()
    const { loading, data } = useSelector((state) => state.transactionsReducers.details)

    useEffect(() => {
        dispatch(transactionDetails(id))
    }, [id, dispatch])

    return (
        <StyledReceiptContent ref={componentRef}>
            <div className='header'>
                <div className='header_logo'>
                    <img src={Icons.logo} alt='logo' />
                    <span>
                        Be ArtEvent
                    </span>
                </div>
            </div>

            {loading ? (
                <StyledLoadingContainer>
                    <CircularProgress />
                </StyledLoadingContainer>
            ) : (
                <div className='content'>
                    <div className='content_body'>
                        <h3>Transaction receipt</h3>
                        <p className='amount'>€{data?.price}</p>

                        <div className='content_body_trsc-history'>
                            <div className='content_body_trsc-history_detail'>
                                <p className='key'>Transaction id<span className='value'>{data?.transactionId}</span></p>
                                <p className='key'>Service provider name<span className='value'>{data?.providerName}</span></p>
                                <p className='key'>Service name<span className='value'>{data?.serviceName}</span></p>
                                <p className='key'>Customer name<span className='value'>{data?.customerName}</span></p>
                                <p className='key'>Date <span className='value'>{moment(data?.date).format('DD MMM YYYY')}</span></p>
                                <p className='key'>Time <span className='value'>{moment(data?.date).format('hh:mm A')}</span></p>
                            </div>

                            {data?.isAdvance && (
                                <div className='content_body_trsc-history_advancePayment' style={{ borderTop: 'none' }}>
                                    <p className='key'>Advance payment <span className='value'>{data?.advancePaymentPercentage}%</span></p>
                                    <p className='key'>Payable amount<span className='value'>€{data?.payableAmount}</span></p>
                                </div>
                            )}

                            {parseInt(data?.platformFee) !== 0 && (
                                <div className='content_body_trsc-history_advancePayment' style={{ borderTop: 'none' }}>
                                    <p className='key'>Platform received amount <span className='value'>€{data?.platformFee}</span></p>
                                </div>
                            )}

                            <div className='content_body_trsc-history_date-time'>
                                <span>{moment().format('DD MMM YYYY')}</span>
                                <span>{moment().format('h:mm A')}</span>
                            </div>
                        </div>
                    </div>

                    <div className='content_footer'>
                        <p>© 2023 Be ArtEvent. All right reserved</p>
                    </div>
                </div>
            )}
        </StyledReceiptContent>
    )
}

export default Index