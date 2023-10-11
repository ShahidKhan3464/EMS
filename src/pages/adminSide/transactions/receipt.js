import React from 'react';
import moment from 'moment';
import { Icons } from 'assets';
import { StyledReceiptContent } from './style';

const Index = ({ data, componentRef = null }) => {

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

            <div className='content'>
                <div className='content_body'>
                    <h3>Transaction receipt</h3>
                    {/* <p className='amount'>€{Math.floor(data?.amount / 100)}</p> */}
                    <p className='amount'>€100</p>

                    <div className='content_body_trsc-history'>
                        <div className='content_body_trsc-history_detail'>
                            {/* <p className='key'>Transaction id<span className='value'>{data?.transactionId.length > 10 ? `${data?.transactionId.slice(0, 10)}...` : data?.transactionId}</span></p> */}
                            <p className='key'>Transaction id<span className='value'>{data?.id}</span></p>
                            <p className='key'>Service provider name<span className='value'>{data?.serPro}</span></p>
                            <p className='key'>Service name<span className='value'>Musicholic</span></p>
                            <p className='key'>Customer name<span className='value'>Peter parker</span></p>
                            <p className='key'>Date <span className='value'>12 May 2022</span></p>
                            <p className='key'>Time <span className='value'>05:30 PM</span></p>
                            {/* <p className='key'>Date <span className='value'>{moment(data?.date).format('DD MMM YYYY')}</span></p> */}
                            {/* <p className='key'>Time <span className='value'>{moment(data?.date, 'HH:mm').format('hh:mm A')}</span></p> */}
                        </div>

                        <div className='content_body_trsc-history_advancePayment' style={{ borderTop: 'none' }}>
                            <p className='key'>Advance payment <span className='value'>5% ($15)</span></p>
                            <p className='key'>Platform received amount <span className='value'>$10</span></p>
                        </div>

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
        </StyledReceiptContent>
    )
}

export default Index