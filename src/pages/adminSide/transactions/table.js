import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { saveAs } from 'file-saver';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { pdf } from '@react-pdf/renderer';
import MenuList from 'components/menuList';
import ReceiptDialog from './receiptDialog';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Pagination from 'components/pagination';
import DownloadReceipt from './DownloadReceipt';
import LoaderContainer from 'components/loader';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import { useReactToPrint } from 'react-to-print';
import PrintReceipt from 'components/viewReceipt';
import NoResultsFound from 'components/noResultsFound';
import TableContainer from '@mui/material/TableContainer';
import { StyledTableCell, StyledTableRow, mainColor } from 'styles/global';

const options = [
    { value: 'view', text: 'View' },
    { value: 'print receipt', text: 'Print receipt' },
    { value: 'download', text: 'Download' },
]

const Index = ({ payload, selected, totalRecords, data, loading, setPayload, setSelected }) => {
    const componentRef = useRef()
    const [id, setId] = useState(null)
    const noResultsFound = data.length === 0
    const [dialogOpen, setDialogOpen] = useState(false)
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

    const getDateFormat = (dataStr) => {
        const originalDate = moment(dataStr)
        const formattedDate = originalDate.format("DD MMM YYYY hh.mm A")
        return formattedDate
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
        const filteredData = data.find(item => item.id === id)
        if (option === 'view') {
            setId(id)
            setDialogOpen(true)
        }

        else if (option === 'print receipt') {
            setId(id)
            setPrintTrigger(true)
        }

        else if (option === 'download') {
            const doc = pdf(<DownloadReceipt data={filteredData} />)
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
                    id={id}
                    setId={setId}
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                />
            )}
            <div style={{ display: 'none' }}>
                {(!dialogOpen && id) && <PrintReceipt id={id} componentRef={componentRef} />}
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
                            <StyledTableCell>Date & Time</StyledTableCell>
                            <StyledTableCell>Platform fee</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <LoaderContainer />
                        ) : noResultsFound ? (
                            <NoResultsFound text="No transaction found" />
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
                                        <StyledTableCell>#{item.transactionId}</StyledTableCell>
                                        <StyledTableCell>{item.customerName}</StyledTableCell>
                                        <StyledTableCell>{item.providerName}</StyledTableCell>
                                        <StyledTableCell>{item.advancePaymentPercentage}% Advance</StyledTableCell>
                                        <StyledTableCell>€{item.price}</StyledTableCell>
                                        <StyledTableCell>{getDateFormat(item.date)}</StyledTableCell>
                                        <StyledTableCell>€{item.platformFee}</StyledTableCell>
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