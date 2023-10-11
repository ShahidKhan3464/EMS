import React, { useState } from 'react';
import { Icons } from 'assets';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import { StyledTableCell, StyledTableRow } from 'styles/global';

function createData(bookingId, transactionId, name, serPro, price, advance, platform) {
    return { bookingId, transactionId, name, serPro, price, advance, platform }
}

const rows = [
    createData('#326532', '#326532', 'Harry Porter', 'Chris Gayle', '100', '5%', '10'),
    createData('#326532', '#326532', 'Harry Porter', 'Chris Gayle', '100', '5%', '10'),
    createData('#326532', '#326532', 'Harry Porter', 'Chris Gayle', '100', '5%', '10'),
    createData('#326532', '#326532', 'Harry Porter', 'Chris Gayle', '100', '5%', '10'),
    createData('#326532', '#326532', 'Harry Porter', 'Chris Gayle', '100', '5%', '10'),
    createData('#326532', '#326532', 'Harry Porter', 'Chris Gayle', '100', '5%', '10'),
    createData('#326532', '#326532', 'Harry Porter', 'Chris Gayle', '100', '5%', '10'),
    createData('#326532', '#326532', 'Harry Porter', 'Chris Gayle', '100', '5%', '10'),
]

const Index = () => {
    const [loading, setLoading] = useState(false)

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
                        <StyledTableCell>Booking id</StyledTableCell>
                        <StyledTableCell>Transaction id</StyledTableCell>
                        <StyledTableCell>Customer name</StyledTableCell>
                        <StyledTableCell>Service provider</StyledTableCell>
                        <StyledTableCell>Price</StyledTableCell>
                        <StyledTableCell>Advance payments</StyledTableCell>
                        <StyledTableCell>Platform fee</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        Array.from({ length: 5 }, (_, index) => (
                            <TableRow key={index}>
                                {Array.from({ length: 4 }, (_, colIndex) => (
                                    <StyledTableCell key={colIndex}>
                                        <Skeleton animation="wave" />
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        rows.map((item, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                    <span style={{ textDecoration: 'underline' }}>
                                        {item.bookingId}
                                    </span>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <span style={{ textDecoration: 'underline' }}>
                                        {item.transactionId}
                                    </span>
                                </StyledTableCell>
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
                                        {item.name}
                                    </div>
                                </StyledTableCell>
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
                                        {item.serPro}
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>€{item.price}</StyledTableCell>
                                <StyledTableCell>{item.advance}</StyledTableCell>
                                <StyledTableCell>{item.platform}</StyledTableCell>
                            </StyledTableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Index