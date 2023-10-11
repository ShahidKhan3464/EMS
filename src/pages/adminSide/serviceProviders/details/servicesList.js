import React from 'react';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import TableRow from '@mui/material/TableRow';
import StarRating from 'components/starRating';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import LoaderContainer from 'components/loader';
import NoResultsFound from 'components/noResultsFound';
import { serviceDetails } from 'redux/services/actions';
import TableContainer from '@mui/material/TableContainer';
import { capitalizeFirstLetter, statusColors, truncatedString } from 'utils';
import { StyledTableCell, StyledTableRow, StyledStatus } from 'styles/global';

const Index = ({ data, loading, setShowServiceDetails }) => {
    const dispatch = useDispatch()
    const noResultsFound = data.length === 0

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
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell>Location</StyledTableCell>
                            <StyledTableCell>Rating</StyledTableCell>
                            <StyledTableCell align='center'>Status</StyledTableCell>
                            <StyledTableCell align='center'>Price</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <LoaderContainer />
                        ) : noResultsFound ? (
                            <NoResultsFound text="No service found" />
                        ) : (
                            data.map((item, index) => (
                                <StyledTableRow
                                    key={index}
                                    onClick={() => {
                                        setShowServiceDetails(true)
                                        dispatch(serviceDetails(item.id))
                                    }}
                                >
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
                                    <StyledTableCell align='center'>
                                        <StyledStatus
                                            color={statusColors[item.serviceStatus].color}
                                            bg={statusColors[item.serviceStatus].background}
                                        >
                                            {capitalizeFirstLetter(item.serviceStatus)}
                                        </StyledStatus>
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>€{item.price}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default Index