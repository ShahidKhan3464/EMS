import React from 'react';
import { Icons } from 'assets';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';
import LoaderContainer from 'components/loader';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import NoResultsFound from 'components/noResultsFound';
import TableContainer from '@mui/material/TableContainer';
import { capitalizeFirstLetter, statusColors, truncatedString } from 'utils';
import { StyledTableCell, StyledTableRow, StyledStatus } from 'styles/global';

const Index = ({ payload, data, loading, totalRecords, setPayload }) => {
    const navigate = useNavigate()
    const noResultsFound = totalRecords === 0

    const getStatus = (str) => {
        if (str.toLowerCase() === 'in_progress') {
            return str
        }
        return str.split("_")[0]
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

    return (
        <React.Fragment>
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
                            <StyledTableCell>Service category</StyledTableCell>
                            <StyledTableCell>Service name</StyledTableCell>
                            <StyledTableCell>Customer name</StyledTableCell>
                            <StyledTableCell>Location</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <LoaderContainer />
                        ) : noResultsFound ? (
                            <NoResultsFound text="No booking found" />
                        ) : (
                            data.map((item, index) => {
                                const { firstName, lastName } = item?.user?.profile || {}
                                const name = `${firstName} ${lastName}`
                                return (
                                    <StyledTableRow
                                        key={index}
                                        onClick={() => navigate(`/booking/viewDetails/${item.id}`)}
                                    >
                                        <StyledTableCell>#{item.uniqueId?.split("-")[0]}</StyledTableCell>
                                        <StyledTableCell>{capitalizeFirstLetter(item.providerService.categories)}</StyledTableCell>
                                        <StyledTableCell>{truncatedString(capitalizeFirstLetter(item.providerService.name))}</StyledTableCell>
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
                                        <StyledTableCell>{truncatedString(item.location)}</StyledTableCell>
                                        <StyledTableCell>€{item.providerService.price}</StyledTableCell>
                                        <StyledTableCell>
                                            <StyledStatus
                                                color={statusColors[getStatus(item.bookedState)]?.color}
                                                bg={statusColors[getStatus(item.bookedState)]?.background}
                                            >
                                                {capitalizeFirstLetter(getStatus(item.bookedState))}
                                            </StyledStatus>
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