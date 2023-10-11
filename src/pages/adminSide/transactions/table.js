import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Icons } from 'assets';
import { saveAs } from 'file-saver';
import PrintReceipt from './receipt';
import Table from '@mui/material/Table';
import { truncatedString } from 'utils';
import Paper from '@mui/material/Paper';
import { pdf } from '@react-pdf/renderer';
import MenuList from 'components/menuList';
import ReceiptDialog from './receiptDialog';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Pagination from 'components/pagination';
import DownloadReceipt from './DownloadReceipt';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import { useReactToPrint } from 'react-to-print';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledTableCell, StyledTableRow, StyledNoResultsFound, mainColor } from 'styles/global';

const options = [
    { value: 'view', text: 'View' },
    { value: 'print receipt', text: 'Print receipt' },
    { value: 'download', text: 'Download' },
]

const Index = ({ payload, selected, totalRecords, data, loading, setPayload, setSelected }) => {
    const componentRef = useRef()
    // const [id, setId] = useState(null)
    const noResultsFound = data.length === 0
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [trscDetails, setTrscDetails] = useState(null)
    const [printTrigger, setPrintTrigger] = useState(false)

    const isSelected = (id) => {
        const index = selected.findIndex(item => item.id === id)
        if (index !== -1) {
            return true
        }
        else {
            return false
        }
    }

    const printReceipt = useReactToPrint({
        content: () => componentRef.current
    })

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

    const handleSelectAllTransaction = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((item) => item)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    const handleIndividualTransaction = (event, id, isItemSelected) => {
        if (!event.target.classList.contains('MuiModal-backdrop')) {
            if (isItemSelected) {
                const selectedIndex = selected.filter(item => item.id !== id)
                setSelected(selectedIndex)
                return
            }

            const selectedIndex = data.find(item => item.id === id)
            setSelected([...selected, selectedIndex])
        }
    }

    const handleTableMenu = async (id, option) => {
        const filteredTransaction = data.find(item => item.id === id)
        if (option === 'view') {
            setDialogOpen(true)
            setDialogType(option)
            setTrscDetails(filteredTransaction)
        }

        else if (option === 'print receipt') {
            setPrintTrigger(true)
            setTrscDetails(filteredTransaction)
        }

        else if (option === 'download') {
            const doc = pdf(<DownloadReceipt data={filteredTransaction} />)
            const blob = await doc.toBlob()
            saveAs(blob, 'receipt.pdf')
        }
    }

    useEffect(() => {
        if (printTrigger) {
            printReceipt()
            setPrintTrigger(false)
        }
    }, [printTrigger, printReceipt])

    return (
        <React.Fragment>
            {dialogOpen && (
                <ReceiptDialog
                    open={dialogOpen}
                    data={trscDetails}
                    setOpen={setDialogOpen}
                />
            )}
            <div style={{ display: 'none' }}>
                <PrintReceipt data={trscDetails} componentRef={componentRef} />
            </div>
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
                            <TableCell
                                padding="checkbox"
                                sx={{ borderBottom: 'none' }}
                            >
                                <Checkbox
                                    onChange={handleSelectAllTransaction}
                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                    checked={data.length > 0 && selected.length === data.length}
                                    indeterminate={selected.length > 0 && selected.length < data.length}
                                    sx={{
                                        color: '#FFFFFF',
                                        '&.Mui-checked': {
                                            color: mainColor,
                                        },
                                    }}
                                />
                            </TableCell>
                            <StyledTableCell>Transaction id</StyledTableCell>
                            <StyledTableCell>Customer name</StyledTableCell>
                            <StyledTableCell>Service provider</StyledTableCell>
                            <StyledTableCell>Advance payments</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ borderBottom: 'none' }}>
                                    <div
                                        style={{
                                            height: '100vh',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <CircularProgress color="inherit" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : noResultsFound ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ borderBottom: 'none' }}>
                                    <StyledNoResultsFound>
                                        <div className='box'>
                                            <img src={Icons.notFound} alt='no-result-found' />
                                            <h3>No transaction found</h3>
                                        </div>
                                    </StyledNoResultsFound>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item, index) => {
                                const isItemSelected = isSelected(item.id)
                                const labelId = `enhanced-table-checkbox-${index}`

                                return (
                                    <StyledTableRow
                                        hover
                                        key={labelId}
                                        tabIndex={-1}
                                        role="checkbox"
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                        aria-checked={isItemSelected}
                                        onClick={(event) => handleIndividualTransaction(event, item.id, isItemSelected)}
                                    >
                                        <TableCell
                                            padding="checkbox"
                                            sx={{ borderBottom: '4px solid #2C2C2C', }}
                                        >
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                                sx={{
                                                    color: '#FFFFFF',
                                                    '&.Mui-checked': {
                                                        color: mainColor,
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <StyledTableCell>{truncatedString(item.id)}</StyledTableCell>
                                        <StyledTableCell>{item.name}</StyledTableCell>
                                        <StyledTableCell>{item.serPro}</StyledTableCell>
                                        <StyledTableCell>{item.advance} Advance</StyledTableCell>
                                        <StyledTableCell>€{item.price}</StyledTableCell>
                                        <StyledTableCell>{item.date}</StyledTableCell>
                                        <StyledTableCell>{item.time}</StyledTableCell>
                                        <StyledTableCell>
                                            <MenuList
                                                id={item.id}
                                                options={options}
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