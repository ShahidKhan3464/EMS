import React, { useEffect } from 'react';
import moment from 'moment';
import { Icons } from 'assets';
import { payloadData } from 'utils';
import { normalGrey } from 'styles/global';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StyledNotifications, StyledHeading } from './style';
import { notificationsList } from 'redux/notifications/actions';

const Index = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, data } = useSelector((state) => state.notificationsReducers.list)
    const { list } = data

    useEffect(() => {
        const updatedPayload = {
            ...payloadData,
            condition: { userType: "SUPER_ADMIN" }
        }
        dispatch(notificationsList(updatedPayload))
    }, [dispatch])

    return (
        <StyledNotifications>
            <div className='header'>
                <StyledHeading>Notifications</StyledHeading>
                <button
                    type='button'
                    onClick={() => navigate('/notifications')}
                >
                    View all
                </button>
            </div>
            <div className='list'>
                {loading ? (
                    Array.from({ length: 5 }, (_, colIndex) => (
                        <Skeleton
                            height={70}
                            width="100%"
                            key={colIndex}
                            sx={{ bgcolor: normalGrey }}
                        />
                    ))
                ) : (
                    list.map(item => {
                        return (
                            <div key={item.id} className='list_item'>
                                <div className='list_item_avatar'>
                                    <img src={Icons.avatar} alt='avatar' />
                                </div>
                                <div className='list_item_text'>
                                    <p>
                                        {item.message}
                                    </p>
                                    <span className='time'>
                                        {moment(item.createdAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </StyledNotifications>
    )
}

export default Index