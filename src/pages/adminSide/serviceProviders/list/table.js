import React, { useState } from 'react';
import { Icons } from 'assets';
import Dialog from 'components/dialog';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import MenuList from 'components/menuList';
import TableRow from '@mui/material/TableRow';
import Pagination from 'components/pagination';
import FormDialog from 'components/formDialog';
import StarRating from 'components/starRating';
import { useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import LoaderContainer from 'components/loader';
import ReasonDialog from 'components/reasonDialog';
import NoResultsFound from 'components/noResultsFound';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import ReasonOfBlockingForm from '../reasonOfBlockingForm';
import CircularProgress from '@mui/material/CircularProgress';
import { capitalizeFirstLetter, statusColors, truncatedString } from 'utils';
import { StyledTableCell, StyledTableRow, StyledStatus } from 'styles/global';
import { serviceProviderBlockUnBlock, serviceProviderBookingDetails } from 'redux/serviceProviders/actions';

const Index = ({ payload, data, value, options, loading, totalRecords, setPayload }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [id, setId] = useState(null)
    const [reason, setReason] = useState("")
    const noResultsFound = totalRecords === 0
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { list } = useSelector((state) => state.serviceProvidersReducers.bookingDetails.data)
    const { loading: statusLoading } = useSelector((state) => state.serviceProvidersReducers.blockUnblock)

    const calculateTotalAmount = (booking) => {
        if (booking.providerService.pricingOption === "PER_HOUR") {
            return booking.providerService.price * booking.providerService.hours
        }
        else {
            return booking.providerService.price
        }
    }

    const calculateTotalAmountForAllBookings = (bookings) => {
        let totalAmount = 0

        for (const booking of bookings) {
            totalAmount += calculateTotalAmount(booking)
        }

        return totalAmount
    }

    const totalAmount = calculateTotalAmountForAllBookings(list)

    const contentRendering = () => {
        let content = ''
        if (!list.length) {
            content = `Are you sure you want to ${dialogType === 'block' ? 'block' : dialogType === 'unblock' && 'unblock'} this service provider?`
        }
        else {
            content = `If you want to block this service provider, you have to refund €${totalAmount} against the ${list.length} inprogress services. Are you sure you want to block this service provider?`
        }
        return content
    }

    const blockUnblockContent = () => {
        return (
            <React.Fragment>
                <div className='icon'>
                    <img src={Icons.setting} alt='setting-icon' />
                </div>

                <div className='text'>
                    <h3>
                        {dialogType === 'block' ? 'Block' : dialogType === 'unblock' && 'Unblock'}
                    </h3>
                    <p>
                        {contentRendering()}
                    </p>
                </div>

                <div className='btn-container'>
                    <button
                        type='button'
                        className='cancel-btn'
                        onClick={() => setDialogOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        className='control-btn'
                        onClick={async () => {
                            if (dialogType === 'block') {
                                setDialogType('reason')
                                return
                            }
                            const obj = { block: false }
                            await dispatch(serviceProviderBlockUnBlock(id, obj))
                            setPayload(prevData => ({ ...prevData }))
                        }}
                    >
                        {statusLoading ? (
                            <CircularProgress
                                size={22}
                                color='inherit'
                            />
                        ) : (
                            dialogType === 'block' ? 'Block' : dialogType === 'unblock' && 'Unblock'
                        )}
                    </button>
                </div>
            </React.Fragment>
        )
    }

    const reasonContent = () => {
        return (
            <p>Reason: <span>{reason}</span></p>
        )
    }

    const unblockReRequest = (reRequest) => {
        return reRequest ? 'UPDATED' : 'PENDING'
    }

    const getAvailabilityStatus = (availability) => {
        return !availability ? 'AVAILABLE' : 'UNAVAILABLE'
    }

    const refundPolicy = (id, isBoolean, option) => {
        setId(id)
        setDialogType(option)
        setDialogOpen(isBoolean)
    }

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

    const handleTableMenu = (id, option, reason) => {
        const updatedPayload = {
            ...payload,
            condition: { bookedState: "IN_PROGRESS", providerService: { user: { id } } }
        }
        if (option === 'block') {
            dispatch(serviceProviderBookingDetails({ data: updatedPayload, successCallBack: refundPolicy }))
        }

        else if (option === 'unblock') {
            setId(id)
            setDialogOpen(true)
            setDialogType(option)
        }

        else if (option === 'view reason') {
            setReason(reason)
            setDialogOpen(true)
            setDialogType(option)
        }
    }

    return (
        <React.Fragment>
            {dialogOpen && ['block', 'unblock'].includes(dialogType)
                ? (
                    <Dialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        content={blockUnblockContent()}
                    />
                ) : dialogType === 'reason' ? (
                    <FormDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        title="Reason of blocking"
                        formContent={
                            <ReasonOfBlockingForm
                                id={id}
                                setPayload={setPayload}
                                setOpen={setDialogOpen}
                            />
                        }
                    />
                ) : dialogType === 'view reason' && (
                    <ReasonDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        title="Reason of blocking"
                        reasonContent={reasonContent()}
                    />
                )
            }
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
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Service category</StyledTableCell>
                            <StyledTableCell>Location</StyledTableCell>
                            <StyledTableCell>Rating</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell align='center'>No of services</StyledTableCell>
                            <StyledTableCell align='center'>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <LoaderContainer />
                        ) : noResultsFound ? (
                            <NoResultsFound text="No service provider found" />
                        ) : (
                            data.map((item) => {
                                const { firstName, lastName } = item.profile
                                const getStatus = value === 0 ? getAvailabilityStatus(item.profile.unavailable) : value === 1 && unblockReRequest(item.unblockReRequest)
                                const name = `${firstName} ${lastName}`

                                return (
                                    <StyledTableRow
                                        key={item.id}
                                        onClick={() => navigate(`/service-provider/viewDetails/${item.id}`)}
                                    >
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
                                                        src={Icons.avatar3}
                                                    />
                                                </div>
                                                {truncatedString(capitalizeFirstLetter(name))}
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell>{capitalizeFirstLetter(item.providerService[0]?.categories)}</StyledTableCell>
                                        <StyledTableCell>{truncatedString(item.profile?.address)}</StyledTableCell>
                                        <StyledTableCell>
                                            <div className='rating'>
                                                <StarRating
                                                    maxRating={5}
                                                    rating={item.rating}
                                                />
                                                <p className='rating-text'>
                                                    {item.rating.toFixed(2)}
                                                </p>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <StyledStatus
                                                color={statusColors[getStatus].color}
                                                bg={statusColors[getStatus].background}
                                            >
                                                {capitalizeFirstLetter(getStatus)}
                                            </StyledStatus>
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>{item.providerService.length}</StyledTableCell>
                                        <StyledTableCell align='center'>
                                            <MenuList
                                                id={item.id}
                                                options={options}
                                                reason={item.reasonOfBlock}
                                                handleTableMenu={handleTableMenu}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
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