import React, { useState } from 'react';
import { Icons } from 'assets';
import Dialog from 'components/dialog';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import MenuList from 'components/menuList';
import TableRow from '@mui/material/TableRow';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';
import StarRating from 'components/starRating';
import FormDialog from 'components/formDialog';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import LoaderContainer from 'components/loader';
import ReasonDialog from 'components/reasonDialog';
import NoResultsFound from 'components/noResultsFound';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import ReasonOfInactiveForm from './reasonOfInactiveForm';
import { changeServiceStatus } from 'redux/services/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { capitalizeFirstLetter, statusColors, truncatedString } from 'utils';
import { StyledTableCell, StyledTableRow, StyledStatus } from 'styles/global';

const Index = ({ payload, data, value, loading, options, totalRecords, setPayload }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [id, setId] = useState(null)
    const [reason, setReason] = useState("")
    const noResultsFound = totalRecords === 0
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { loading: statusLoading } = useSelector((state) => state.servicesReducers.changeStatus)

    const activeInActiveContent = () => {
        return (
            <React.Fragment>
                <div className='icon'>
                    <img src={Icons.setting} alt='setting-icon' />
                </div>

                <div className='text'>
                    <h3>
                        {dialogType === 'active' ? 'Active' : dialogType === 'inactive' && 'Inactive'}
                    </h3>
                    <p>
                        Are you sure you want to {dialogType === 'active' ? 'active' : dialogType === 'inactive' && 'inactive'} this service?
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
                            if (dialogType === 'inactive') {
                                setDialogType('reason')
                                return
                            }
                            const obj = { status: "ACTIVE" }
                            await dispatch(changeServiceStatus(id, obj))
                            setPayload(prevData => ({ ...prevData }))
                            setDialogOpen(false)
                        }}
                    >
                        {statusLoading ? (
                            <CircularProgress
                                size={22}
                                color='inherit'
                            />
                        ) : (
                            dialogType === 'active' ? 'Active' : dialogType === 'inactive' && 'Inactive'
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

    const activeReRequest = (activReRequest) => {
        return activReRequest ? 'UPDATED' : 'PENDING'
    }

    const getAvailabilityStatus = (availability) => {
        return !availability ? 'AVAILABLE' : 'UNAVAILABLE'
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
        if (option === 'active') {
            setId(id)
            setDialogOpen(true)
            setDialogType(option)
        }

        else if (option === 'inactive') {
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
            {dialogOpen && ['active', 'inactive'].includes(dialogType)
                ? (
                    <Dialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        content={activeInActiveContent()}
                    />
                ) : dialogType === 'reason' ? (
                    <FormDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        title="Reason of inactive"
                        formContent={
                            <ReasonOfInactiveForm
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
                        title="Reason of inactive"
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
                            <StyledTableCell>Service category</StyledTableCell>
                            <StyledTableCell>Service name</StyledTableCell>
                            <StyledTableCell>Location</StyledTableCell>
                            <StyledTableCell>Rating</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell align='center'>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <LoaderContainer />
                        ) : noResultsFound ? (
                            <NoResultsFound text="No service found" />
                        ) : (
                            data.map((item) => {
                                const getStatus = value === 0 ? getAvailabilityStatus(item.unavailable) : value === 1 && activeReRequest(item.activeReRequest)
                                return (
                                    <StyledTableRow
                                        key={item.id}
                                        onClick={() => navigate(`/service/viewDetails/${item.id}`)}
                                    >
                                        <StyledTableCell>{capitalizeFirstLetter(item.categories)}</StyledTableCell>
                                        <StyledTableCell>{capitalizeFirstLetter(item.name)}</StyledTableCell>
                                        <StyledTableCell>{truncatedString(item.serviceAddress)}</StyledTableCell>
                                        <StyledTableCell>
                                            <div className='rating'>
                                                <StarRating
                                                    maxRating={5}
                                                    rating={item.rating}
                                                />
                                                <p className='rating-text'>
                                                    {item.rating.toFixed(2)} based on {item.feedback.length} reviews
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
                                        <StyledTableCell>€{item.price}</StyledTableCell>
                                        <StyledTableCell align='center'>
                                            <MenuList
                                                id={item.id}
                                                options={options}
                                                handleTableMenu={handleTableMenu}
                                                reason={item.serviceInactiveReason}
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
        </React.Fragment >
    )
}

export default Index