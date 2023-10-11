import React, { useState } from 'react';
import { Icons } from 'assets';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import { StyledTableCell, StyledTableRow, normalGrey } from 'styles/global';

function createData(transactionId, name, amount, date) {
    return { transactionId, name, amount, date }
}

const rows = [
    createData('#3265', 'Harry Porter', '$100', '25 Jun 2023'),
    createData('#3265', 'Harry Porter', '$100', '25 Jun 2023'),
    createData('#3265', 'Harry Porter', '$100', '25 Jun 2023'),
    createData('#3265', 'Harry Porter', '$100', '25 Jun 2023'),
    createData('#3265', 'Harry Porter', '$100', '25 Jun 2023'),
    createData('#3265', 'Harry Porter', '$100', '25 Jun 2023'),
    createData('#3265', 'Harry Porter', '$100', '25 Jun 2023'),
    createData('#3265', 'Harry Porter', '$100', '25 Jun 2023'),
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
                        <StyledTableCell>Transaction ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align='center'>Amount</StyledTableCell>
                        <StyledTableCell align='center'>Date</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        Array.from({ length: 5 }, (_, index) => (
                            <TableRow key={index}>
                                {Array.from({ length: 4 }, (_, colIndex) => (
                                    <StyledTableCell key={colIndex}>
                                        <Skeleton
                                            animation="wave"
                                            sx={{ bgcolor: normalGrey }}
                                        />
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        rows.slice(0, 6).map((item, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{item.transactionId}</StyledTableCell>
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
                                <StyledTableCell align='center'>{item.amount}</StyledTableCell>
                                <StyledTableCell align='center'>{item.date}</StyledTableCell>
                            </StyledTableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Index