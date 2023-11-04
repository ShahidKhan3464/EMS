import React from 'react';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import LoaderContainer from 'components/loader';
import NoResultsFound from 'components/noResultsFound';
import TableContainer from '@mui/material/TableContainer';
import { StyledTableCell, StyledTableRow } from 'styles/global';
import { capitalizeFirstLetter } from 'utils';

const Index = ({ payload, data, loading, totalRecords, setPayload }) => {
    const navigate = useNavigate()
    const noResultsFound = totalRecords === 0

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
                            <StyledTableCell>Customer name</StyledTableCell>
                            <StyledTableCell>Service category</StyledTableCell>
                            <StyledTableCell>Service name</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <LoaderContainer />
                        ) : noResultsFound ? (
                            <NoResultsFound text="No booking found" />
                        ) : (
                            data.map((item, index) => {
                                const { firstName, lastName } = item.user.profile
                                const name = `${firstName} ${lastName}`
                                return (
                                    <StyledTableRow
                                        key={index}
                                        onClick={() => navigate(`/booking/viewDetails/${item.id}`)}
                                    >
                                        <StyledTableCell>#{item.uniqueId}</StyledTableCell>
                                        <StyledTableCell>{name}</StyledTableCell>
                                        <StyledTableCell>{capitalizeFirstLetter(item.providerService.categories)}</StyledTableCell>
                                        <StyledTableCell>{item.providerService.name}</StyledTableCell>
                                        <StyledTableCell>€{item.providerService.price}</StyledTableCell>
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
                    count={data.length}
                    rowsPerPage={payload.pageSize}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </React.Fragment>
    )
}

export default Index