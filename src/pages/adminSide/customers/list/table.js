import React, { useState } from 'react';
import { Icons } from 'assets';
import Dialog from 'components/dialog';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import MenuList from 'components/menuList';
import TableRow from '@mui/material/TableRow';
import FormDialog from 'components/formDialog';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import LoaderContainer from 'components/loader';
import TableHead from '@mui/material/TableHead';
import ReasonDialog from 'components/reasonDialog';
import NoResultsFound from 'components/noResultsFound';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import ReasonOfBlockingForm from '../reasonOfBlockingForm';
import CircularProgress from '@mui/material/CircularProgress';
import { customerBlockUnBlock } from 'redux/customers/actions';
import { capitalizeFirstLetter, statusColors, truncatedString } from 'utils';
import { StyledTableCell, StyledTableRow, StyledStatus } from 'styles/global';

const Index = ({ payload, data, value, loading, options, totalRecords, setPayload }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [id, setId] = useState(null)
    const [reason, setReason] = useState("")
    const noResultsFound = totalRecords === 0
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { loading: statusLoading } = useSelector((state) => state.customersReducers.blockUnblock)

    const blockUnblockContent = () => {
        return (
            <React.Fragment>
                <div className='icon'>
                    <img src={Icons.customer} alt='customer-icon' />
                </div>

                <div className='text'>
                    <h3>
                        {dialogType === 'block' ? 'Block' : dialogType === 'unblock' && 'Unblock'}
                    </h3>
                    <p>
                        Are you sure you want to {dialogType === 'block' ? 'block' : dialogType === 'unblock' && 'unblock'} this customer?
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
                            await dispatch(customerBlockUnBlock(id, obj))
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
        if (option === 'block') {
            setId(id)
            setDialogOpen(true)
            setDialogType(option)
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
                            <StyledTableCell>Customer name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Phone number</StyledTableCell>
                            <StyledTableCell>Location</StyledTableCell>
                            {value === 1 && <StyledTableCell>Status</StyledTableCell>}
                            <StyledTableCell align='center'>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <LoaderContainer />
                        ) : noResultsFound ? (
                            <NoResultsFound text="No customer found" />
                        ) : (
                            data.map((item, index) => {
                                const { firstName, lastName } = item.profile
                                const name = `${firstName} ${lastName}`
                                return (
                                    <StyledTableRow
                                        key={index}
                                        onClick={() => navigate(`/customer/viewDetails/${item.id}`)}
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
                                                        src={Icons.avatar2}
                                                    />
                                                </div>
                                                {truncatedString(capitalizeFirstLetter(name))}
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell>{truncatedString(item.email)}</StyledTableCell>
                                        <StyledTableCell>{item.profile.phoneNumber}</StyledTableCell>
                                        <StyledTableCell>{truncatedString(item.profile.address)}</StyledTableCell>
                                        {value === 1 && (
                                            <StyledTableCell>
                                                <StyledStatus
                                                    color={statusColors[unblockReRequest(item.unblockReRequest)].color}
                                                    bg={statusColors[unblockReRequest(item.unblockReRequest)].background}
                                                >
                                                    {capitalizeFirstLetter(unblockReRequest(item.unblockReRequest))}
                                                </StyledStatus>
                                            </StyledTableCell>
                                        )}
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