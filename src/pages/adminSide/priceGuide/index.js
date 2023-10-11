import React, { useEffect, useState } from 'react';
import { Icons } from 'assets';
import EditForm from './editForm';
import LayoutContent from 'layout';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Dialog from 'components/reasonDialog';
import TableRow from '@mui/material/TableRow';
import { capitalizeFirstLetter } from 'utils';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { StyledListOfCategories } from './style';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import { priceGuideList } from 'redux/priceGuide/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledTableCell, StyledTableRow, StyledMainHeading, StyledLoadingContainer } from 'styles/global';

const Index = () => {
    const dispatch = useDispatch()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [updatePriceGuide, setUpdatePriceGuide] = useState({})
    const { loading, data } = useSelector((state) => state.priceGuideReducers.list)
    const { LOCATION, CATERING, STAGING, MUSIC, ENTERTAINMENT } = data

    useEffect(() => {
        dispatch(priceGuideList())
    }, [dispatch])

    return (
        <React.Fragment>
            {dialogOpen && (
                <Dialog
                    open={dialogOpen}
                    title="Price guide"
                    setOpen={setDialogOpen}
                    reasonContent={
                        <EditForm
                            data={updatePriceGuide}
                            setDialogOpen={setDialogOpen}
                        />
                    }
                />
            )}
            <LayoutContent>
                <div className='content'>
                    <div className='content_heading'>
                        <StyledMainHeading>Price guide</StyledMainHeading>
                    </div>
                    {loading ? (
                        <StyledLoadingContainer>
                            <CircularProgress />
                        </StyledLoadingContainer>
                    ) : (
                        <StyledListOfCategories>
                            <div className='list'>
                                <div className='list_categories'>
                                    <h3 className='title'>Location</h3>
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
                                                    <StyledTableCell style={{ width: '175px' }}>Category</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Sub category</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Type of fee</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Actual fee</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Edit</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {LOCATION?.map((item, index) => {
                                                    return (
                                                        <StyledTableRow key={index}>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.category)}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.subCategory.replace(/_/g, " "))}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.typeOfFee)}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{item.actualFee}%</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>
                                                                <button
                                                                    type='button'
                                                                    className='edit-btn'
                                                                    onClick={() => {
                                                                        setDialogOpen(true)
                                                                        setUpdatePriceGuide(item)
                                                                    }}
                                                                >
                                                                    <img src={Icons.edit} alt='edit' />
                                                                </button>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div className='list_categories'>
                                    <h3 className='title'>Music</h3>
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
                                                    <StyledTableCell style={{ width: '175px' }}>Category</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Sub category</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Type of fee</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Actual fee</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Edit</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {MUSIC?.map((item, index) => {
                                                    return (
                                                        <StyledTableRow key={index}>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.category)}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.subCategory.replace(/_/g, " "))}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.typeOfFee)}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{item.actualFee}%</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>
                                                                <button
                                                                    type='button'
                                                                    className='edit-btn'
                                                                    onClick={() => {
                                                                        setDialogOpen(true)
                                                                        setUpdatePriceGuide(item)
                                                                    }}
                                                                >
                                                                    <img src={Icons.edit} alt='edit' />
                                                                </button>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div className='list_categories'>
                                    <h3 className='title'>Entertainment</h3>
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
                                                    <StyledTableCell style={{ width: '175px' }}>Category</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Sub category</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Type of fee</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Actual fee</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Edit</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {ENTERTAINMENT?.map((item, index) => {
                                                    return (
                                                        <StyledTableRow key={index}>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.category)}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.subCategory.replace(/_/g, " "))}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.typeOfFee)}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>€{item.actualFee}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>
                                                                <button
                                                                    type='button'
                                                                    className='edit-btn'
                                                                    onClick={() => {
                                                                        setDialogOpen(true)
                                                                        setUpdatePriceGuide(item)
                                                                    }}
                                                                >
                                                                    <img src={Icons.edit} alt='edit' />
                                                                </button>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div className='list_categories'>
                                    <h3 className='title'>Staging</h3>
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
                                                    <StyledTableCell style={{ width: '175px' }}>Category</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Sub category</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Type of fee</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Actual fee</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Edit</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {STAGING?.map((item, index) => {
                                                    return (
                                                        <StyledTableRow key={index}>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.category)}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.subCategory.replace(/_/g, " "))}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.typeOfFee)}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>€{item.actualFee}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>
                                                                <button
                                                                    type='button'
                                                                    className='edit-btn'
                                                                    onClick={() => {
                                                                        setDialogOpen(true)
                                                                        setUpdatePriceGuide(item)
                                                                    }}
                                                                >
                                                                    <img src={Icons.edit} alt='edit' />
                                                                </button>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div className='list_categories'>
                                    <h3 className='title'>Catering</h3>
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
                                                    <StyledTableCell style={{ width: '175px' }}>Category</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Sub category</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Type of fee</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Actual fee</StyledTableCell>
                                                    <StyledTableCell style={{ width: '175px' }}>Edit</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {CATERING?.map((item, index) => {
                                                    return (
                                                        <StyledTableRow key={index}>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.category)}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.subCategory.replace(/_/g, " "))}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{capitalizeFirstLetter(item.typeOfFee)}</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>{item.actualFee}%</StyledTableCell>
                                                            <StyledTableCell style={{ width: '175px' }}>
                                                                <button
                                                                    type='button'
                                                                    className='edit-btn'
                                                                    onClick={() => {
                                                                        setDialogOpen(true)
                                                                        setUpdatePriceGuide(item)
                                                                    }}
                                                                >
                                                                    <img src={Icons.edit} alt='edit' />
                                                                </button>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </StyledListOfCategories>
                    )}
                </div>
            </LayoutContent>
        </React.Fragment >
    )
}

export default Index