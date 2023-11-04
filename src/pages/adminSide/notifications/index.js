import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Icons } from 'assets';
import LayoutContent from 'layout';
import styled from "styled-components";
import Badge from '@mui/material/Badge';
import Switch from '@mui/material/Switch';
import { StyledNotifications } from './style';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetter, payloadData } from 'utils';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledLoadingContainer, StyledMainHeading } from 'styles/global';
import { markAsReadNotifications, notificationsList, unreadCounter } from 'redux/notifications/actions';

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        height: '8px',
        minWidth: '8px',
        backgroundColor: '#F00',
    },
}))

const Index = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false)
    const [payload, setPayload] = useState(payloadData)
    const { loading, data } = useSelector((state) => state.notificationsReducers.list)
    const { totalRecords, list } = data
    const noResultsFound = totalRecords === 0
    const hasUnreadNotifications = list.some(notification => !notification.readStatus)

    const handleChangePage = (event, newPage) => {
        setPayload(prevData => ({
            ...prevData,
            page: newPage,
        }))
    }

    const handleChangeRowsPerPage = (e) => {
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: parseInt(e.target.value, 10)
        }))
    }

    const handleShowUnreadNotifications = (event) => {
        setChecked(event.target.checked)
        if (event.target.checked) {
            setChecked(event.target.checked)
            return
        }
        setChecked(event.target.checked)
    }

    const handleMarkAllAsReadNotifications = async () => {
        const markAsRead = list
            .filter(notification => !notification.readStatus)
            .map(notification => notification.id)

        const obj = { notificationIds: markAsRead }
        await dispatch(markAsReadNotifications(obj))
        await dispatch(unreadCounter())
        setPayload(prevData => ({ ...prevData }))
    }

    useEffect(() => {
        const updatedPayload = {
            ...payload,
            condition: {
                userType: "SUPER_ADMIN",
                ...(checked && {
                    readStatus: !checked,
                })
            }
        }
        dispatch(notificationsList(updatedPayload))
    }, [payload, checked, dispatch])

    return (
        <LayoutContent>
            <StyledNotifications>
                <div className='header'>
                    <div className='header_left'>
                        <button
                            type='button'
                            onClick={() => navigate(-1)}
                        >
                            <img src={Icons.backBtn} alt='back-arrow' />
                        </button>
                        <StyledMainHeading>Notifications</StyledMainHeading>
                    </div>

                    <div className='header_right'>
                        <div className='show-unread'>
                            <FormGroup>
                                <FormControlLabel
                                    className="customLabel"
                                    label="Only show unread"
                                    control={
                                        <Switch
                                            checked={checked}
                                            onChange={handleShowUnreadNotifications}
                                            sx={{
                                                '& .MuiSwitch-track': {
                                                    backgroundColor: '#B6B6B7'
                                                },
                                            }}
                                        />
                                    }
                                />
                            </FormGroup>
                        </div>

                        <div className='mark-asread'>
                            {hasUnreadNotifications && (
                                <div className='mark-asread'>
                                    <p onClick={handleMarkAllAsReadNotifications}>
                                        Mark all as read
                                        <img src={Icons.checkMark} alt='check-mark' />
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {loading ? (
                    <StyledLoadingContainer>
                        <CircularProgress />
                    </StyledLoadingContainer>
                ) : (
                    <div className='list'>
                        {list.map((item) => {
                            return (
                                <div key={item.id} className='list_item'>
                                    <div>
                                        <div className='left'>
                                            {!item.readStatus && (
                                                <StyledBadge
                                                    variant="dot"
                                                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                                />
                                            )}
                                            <div className='icon'>
                                                <img src={Icons.notifi} alt='notification' />
                                            </div>
                                        </div>
                                        <div className='text'>
                                            <h3 className='title'>{capitalizeFirstLetter(item.title)}</h3>
                                            <p className='message'>
                                                {item.message}
                                            </p>
                                        </div>
                                    </div>
                                    <p className='duration'>
                                        {moment(item.createdAt).fromNow()}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                )}
                {!noResultsFound && !loading && (
                    <Pagination
                        page={payload.page}
                        count={totalRecords}
                        rowsPerPage={payload.pageSize}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </StyledNotifications>
        </LayoutContent>
    )
}

export default Index