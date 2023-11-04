import React, { useEffect, useState } from 'react';
import { Icons } from 'assets';
import { payloadData } from 'utils';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import ViewReceipt from 'components/viewReceipt';
import IconButton from '@mui/material/IconButton';
import NoResultsFound from 'components/noResultsFound';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import { transactionsList } from 'redux/transactions/actions';
import { StyledTableCell, StyledTableRow, normalGrey } from 'styles/global';

const Index = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [id, setId] = useState(null)
    const [payload, setPayload] = useState(payloadData)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { loading, data } = useSelector((state) => state.transactionsReducers.list)
    const { totalRecords, list } = data
    const noResultsFound = list.length === 0

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

    useEffect(() => {
        dispatch(transactionsList(payload))
    }, [payload, dispatch])

    return (
        <React.Fragment>
            {dialogOpen && (
                <Dialog
                    open={dialogOpen}
                    onClose={() => {
                        setId(null)
                        setDialogOpen(false)
                    }}
                    PaperProps={{
                        style: {
                            width: '100%',
                            overflowY: 'hidden',
                            borderRadius: '6px',
                            backgroundColor: '#2C2C2C',
                            boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.08)',
                        },
                    }}
                >
                    <IconButton
                        aria-label="close"
                        sx={{
                            top: 16,
                            right: 16,
                            padding: 0,
                            position: 'absolute',
                            '@media screen and (max-width: 520px)': {
                                top: 12,
                                right: 8,
                            }
                        }}
                        onClick={() => {
                            setId(null)
                            setDialogOpen(false)
                        }}
                    >
                        <img src={Icons.popUpCross} alt='cross-icon' />
                    </IconButton>
                    <ViewReceipt id={id} />
                </Dialog>
            )}

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
                                    {Array.from({ length: 7 }, (_, colIndex) => (
                                        <StyledTableCell key={colIndex}>
                                            <Skeleton
                                                sx={{ bgcolor: normalGrey }}
                                            />
                                        </StyledTableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : noResultsFound ? (
                            <NoResultsFound text="No transaction found" />
                        ) : (
                            list.map((item, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>
                                        <span
                                            style={{ textDecoration: 'underline' }}
                                            onClick={() => navigate(`/booking/viewDetails/${item.bookingId}`)}
                                        >
                                            #{item.uniqueBookingId}
                                        </span>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <span
                                            style={{ textDecoration: 'underline' }}
                                            onClick={() => {
                                                setId(item.id)
                                                setDialogOpen(true)
                                            }}
                                        >
                                            #{item.transactionId}
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
                                            {item.customerName}
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
                                            {item.providerName}
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell>€{item.price}</StyledTableCell>
                                    <StyledTableCell align="center">{item.advancePaymentPercentage}%</StyledTableCell>
                                    <StyledTableCell>€{item.platformFee}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {!noResultsFound && !loading && (
                <Pagination
                    page={payload.page}
                    count={totalRecords}
                    rowsPerPage={payload.pageSize}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </React.Fragment>
    )
}

export default Index