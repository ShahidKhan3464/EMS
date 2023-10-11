import React, { useState } from 'react';
import { Icons } from 'assets';
import ChatBox from './chatBox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { StyledQueriesList } from '../style';
import TableRow from '@mui/material/TableRow';
import Pagination from 'components/pagination';
import TableBody from '@mui/material/TableBody';
import LoaderContainer from 'components/loader';
import TableHead from '@mui/material/TableHead';
import NoResultsFound from 'components/noResultsFound';
import TableContainer from '@mui/material/TableContainer';
import { capitalizeFirstLetter, statusColors } from 'utils';
import { StyledTableCell, StyledTableRow, StyledStatus } from 'styles/global';

const Index = ({ data, payload, totalRecords, loading, setPayload }) => {
    const noResultsFound = totalRecords === 0
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [singleQueryData, setSingleQueryData] = useState(null)

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

    const handleViewQuery = (data) => {
        setIsChatOpen(true)
        setSingleQueryData(data)
    }

    return (
        <StyledQueriesList>
            {!isChatOpen ? (
                <React.Fragment>
                    <TableContainer
                        component={Paper}
                        sx={{
                            boxShadow: 'none',
                            overflowX: 'auto',
                            overflowY: 'clip',
                            borderRadius: '4px',
                            background: '#323232',
                        }}
                    >
                        <Table>
                            <TableHead sx={{ background: '#111' }}>
                                <TableRow>
                                    <StyledTableCell>Ticket id</StyledTableCell>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Subject</StyledTableCell>
                                    <StyledTableCell>Status</StyledTableCell>
                                    <StyledTableCell>View</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <LoaderContainer />
                                ) : noResultsFound ? (
                                    <NoResultsFound text="No query found" />
                                ) : (
                                    data.map((item, index) => {
                                        const { firstName, lastName } = item.user.profile
                                        const name = `${firstName} ${lastName}`
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
                                                            {name}
                                                            <span className='email'>{item.user.email}</span>
                                                        </div>
                                                    </div>
                                                </StyledTableCell>
                                                <StyledTableCell>{item.subject}</StyledTableCell>
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
                                                        onClick={() => handleViewQuery(item)}
                                                    >
                                                        <img src={Icons.eye} alt='eye' />
                                                    </button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    }))}
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
            ) : (
                <ChatBox
                    setPayload={setPayload}
                    queryData={singleQueryData}
                    setIsChatOpen={setIsChatOpen}
                />
            )}
        </StyledQueriesList>
    )
}

export default Index