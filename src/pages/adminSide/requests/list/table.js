import React, { useState } from 'react';
import { Icons } from 'assets';
import Dialog from 'components/dialog';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import TableRow from '@mui/material/TableRow';
import FormDialog from 'components/formDialog';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import LoaderContainer from 'components/loader';
import NoResultsFound from 'components/noResultsFound';
import TableContainer from '@mui/material/TableContainer';
import CauseOfRejectionForm from '../causeOfRejectionForm';
import { serviceProviderApproval } from 'redux/serviceProviders/actions';
import { capitalizeFirstLetter, statusColors, truncatedString } from 'utils';
import { StyledTableCell, StyledTableRow, StyledStatus } from 'styles/global';

const Index = ({ payload, data, value, totalRecords, loading, setPayload }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [id, setId] = useState()
    const noResultsFound = totalRecords === 0
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogType, setDialogType] = useState(false)

    const rejectContent = () => {
        return (
            <React.Fragment>
                <div className='icon'>
                    <img src={Icons.reject} alt='reject-icon' />
                </div>

                <div className='text'>
                    <h3>Reject request</h3>
                    <p>Are you sure you want to reject this request?</p>
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
                        onClick={() => setDialogType('reason')}
                    >
                        Reject
                    </button>
                </div>
            </React.Fragment>
        )
    }

    const approvalReRequest = (approvedReRequest) => {
        return approvedReRequest ? 'UPDATED' : 'PENDING'
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

    const handleApproveServiceProvider = async (e, id) => {
        e.stopPropagation()
        const obj = { profileApprovedStatus: "APPROVED" }
        await dispatch(serviceProviderApproval(id, obj))
        setPayload(prevData => ({ ...prevData }))
    }

    return (
        <React.Fragment>
            {dialogOpen && (dialogType === 'reject')
                ? (
                    <Dialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        content={rejectContent()}
                    />
                ) : dialogType === 'reason' && (
                    <FormDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        title="Add cause of rejection"
                        formContent={
                            <CauseOfRejectionForm
                                id={id}
                                setPayload={setPayload}
                                setOpen={setDialogOpen}
                            />
                        }
                    />
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
                            <StyledTableCell>Service provider</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Phone number</StyledTableCell>
                            {value === 1 && <StyledTableCell>Status</StyledTableCell>}
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <LoaderContainer />
                        ) : noResultsFound ? (
                            <NoResultsFound text="No request found" />
                        ) : (
                            data.map((item, index) => {
                                const { firstName, lastName } = item.profile
                                const name = `${firstName} ${lastName}`
                                return (
                                    <StyledTableRow
                                        key={index}
                                        onClick={() => navigate(`/request/viewDetails/${item.id}`)}
                                    >
                                        <StyledTableCell>
                                            <div
                                                style={{
                                                    gap: '12px',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <div>
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
                                        {value === 1 && (
                                            <StyledTableCell>
                                                <StyledStatus
                                                    color={statusColors[approvalReRequest(item.approvedReRequest)].color}
                                                    bg={statusColors[approvalReRequest(item.approvedReRequest)].background}
                                                >
                                                    {capitalizeFirstLetter(approvalReRequest(item.approvedReRequest))}
                                                </StyledStatus>
                                            </StyledTableCell>
                                        )}
                                        <StyledTableCell>
                                            <div
                                                style={{
                                                    gap: '12px',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <button
                                                    type='button'
                                                    className='approval-btn'
                                                    onClick={(e) => handleApproveServiceProvider(e, item.id)}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    type='button'
                                                    className='reject-btn'
                                                    onClick={(e) => {
                                                        setId(item.id)
                                                        e.stopPropagation()
                                                        setDialogOpen(true)
                                                        setDialogType('reject')
                                                    }}
                                                >
                                                    Reject
                                                </button>
                                            </div>
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