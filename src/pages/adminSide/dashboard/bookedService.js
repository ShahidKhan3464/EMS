import React, { useEffect } from 'react';
import { Icons } from 'assets';
import { payloadData } from 'utils';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { truncatedString } from 'utils';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { bookingsList } from 'redux/bookings/actions';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import { StyledTableCell, StyledTableRow, normalGrey } from 'styles/global';

const Index = () => {
    const dispatch = useDispatch()
    const { loading, data } = useSelector((state) => state.bookingsReducers.list)
    const { list } = data

    useEffect(() => {
        dispatch(bookingsList(payloadData))
    }, [dispatch])

    return (
        <TableContainer
            component={Paper}
            sx={{
                boxShadow: 'none',
                borderRadius: '4px',
                background: '#323232',
            }}
        >
            <Table>
                <TableHead sx={{ background: '#111' }}>
                    <TableRow>
                        <StyledTableCell>Customer name</StyledTableCell>
                        <StyledTableCell>Event</StyledTableCell>
                        <StyledTableCell>Service</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        Array.from({ length: 5 }, (_, index) => (
                            <TableRow key={index}>
                                {Array.from({ length: 3 }, (_, colIndex) => (
                                    <StyledTableCell key={colIndex}>
                                        <Skeleton
                                            sx={{ bgcolor: normalGrey }}
                                        />
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        list.map((item, index) => {
                            const { firstName, lastName } = item?.user?.profile || {}
                            const eventName = item?.event?.name
                            const serviceName = item?.providerService?.name
                            const name = `${firstName} ${lastName}`

                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>
                                        <div
                                            style={{
                                                gap: '12px',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div style={{ display: 'flex' }}>
                                                <img
                                                    alt='avatar'
                                                    src={Icons.avatar2}
                                                />
                                            </div>
                                            {truncatedString(name)}
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell>{eventName}</StyledTableCell>
                                    <StyledTableCell>{serviceName}</StyledTableCell>
                                </StyledTableRow>
                            )
                        })
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Index