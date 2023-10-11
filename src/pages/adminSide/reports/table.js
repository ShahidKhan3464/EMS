import React, { useState } from 'react';
import { Icons } from 'assets';
import ChatBox from './chatBox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { StyledReportList } from './style';
import TableRow from '@mui/material/TableRow';
import Pagination from 'components/pagination';
import LoaderContainer from 'components/loader';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import NoResultsFound from 'components/noResultsFound';
import TableContainer from '@mui/material/TableContainer';
import { capitalizeFirstLetter, statusColors } from 'utils';
import { StyledTableCell, StyledTableRow, StyledStatus } from 'styles/global';

const Index = ({ data, value, payload, totalRecords, loading, setPayload }) => {
    const noResultsFound = totalRecords === 0
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [singleReportData, setSingleReportData] = useState(null)

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

    const handleViewReport = (data) => {
        setIsChatOpen(true)
        setSingleReportData(data)
    }

    return (
        <StyledReportList>
            {!isChatOpen ? (
                <React.Fragment>
                    <div className='reports'>
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
                                        <StyledTableCell>Ticket id</StyledTableCell>
                                        <StyledTableCell>Reported by</StyledTableCell>
                                        <StyledTableCell>Subject</StyledTableCell>
                                        <StyledTableCell>
                                            {value === 0 ? 'Customer' : (value === 1 || value === 2) && 'Service provider'}
                                        </StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell>View</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        <LoaderContainer />
                                    ) : noResultsFound ? (
                                        <NoResultsFound text="No report found" />
                                    ) : (
                                        data.map((item, index) => {
                                            const { firstName: reportedToFirstName, lastName: reportedToLastName } = item.reportedUser.profile
                                            const { firstName: reportedByFirstName, lastName: reportedByLastName } = item.user.profile
                                            const reportedBy = `${reportedByFirstName} ${reportedByLastName}`
                                            const reportedTo = `${reportedToFirstName} ${reportedToLastName}`

                                            return (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell>#{item.uniqueId}</StyledTableCell>
                                                    <StyledTableCell>
                                                        <div
                                                            style={{
                                                                gap: '8px',
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%' }}>
                                                                <img
                                                                    alt='avatar'
                                                                    width="100%"
                                                                    height="100%"
                                                                    src={Icons.avatar4}
                                                                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                            <div>
                                                                {reportedBy}
                                                                <span className='email'>{item.user.email}</span>
                                                            </div>
                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell>{item.subject}</StyledTableCell>
                                                    <StyledTableCell>
                                                        <div
                                                            style={{
                                                                gap: '8px',
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%' }}>
                                                                <img
                                                                    alt='avatar'
                                                                    width="100%"
                                                                    height="100%"
                                                                    src={Icons.avatar2}
                                                                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                            <div>
                                                                {reportedTo}
                                                                <span className='email'>{item.reportedUser.email}</span>
                                                            </div>
                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <StyledStatus
                                                            color={statusColors[item.queryStatus].color}
                                                            bg={statusColors[item.queryStatus].background}
                                                        >
                                                            {capitalizeFirstLetter(item.queryStatus)}
                                                        </StyledStatus>
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <button
                                                            type='button'
                                                            className='view-btn'
                                                            onClick={() => handleViewReport(item)}
                                                        >
                                                            <img src={Icons.eye} alt='eye' />
                                                        </button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
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
            ) : (
                <ChatBox
                    setPayload={setPayload}
                    reportData={singleReportData}
                    setIsChatOpen={setIsChatOpen}
                />
            )}
        </StyledReportList>
    )
}

export default Index