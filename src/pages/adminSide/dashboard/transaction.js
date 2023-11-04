import React, { useEffect } from 'react';
import moment from 'moment';
import { Icons } from 'assets';
import { payloadData } from 'utils';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import { transactionsList } from 'redux/transactions/actions';
import { StyledTableCell, StyledTableRow, normalGrey } from 'styles/global';

const Index = () => {
    const dispatch = useDispatch()
    const { loading, data } = useSelector((state) => state.transactionsReducers.list)
    const { list } = data

    useEffect(() => {
        dispatch(transactionsList(payloadData))
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
                                            sx={{ bgcolor: normalGrey }}
                                        />
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        list.map((item, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>#{item.transactionId}</StyledTableCell>
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
                                        {item.customerName}
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align='center'>€{item.price}</StyledTableCell>
                                <StyledTableCell align='center'>{moment(item.date).format('DD MMM YYYY')}</StyledTableCell>
                            </StyledTableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Index