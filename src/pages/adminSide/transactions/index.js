import React, { useEffect, useRef, useState } from 'react';
import Table from './table';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { Icons } from 'assets';
import LayoutContent from 'layout';
import { saveAs } from 'file-saver';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { payloadData } from 'utils';
import Tabs from '@mui/material/Tabs';
import Dialog from 'components/dialog';
import Radio from '@mui/material/Radio';
import { pdf } from '@react-pdf/renderer';
import DatePicker from "react-datepicker";
import Dropdown from 'components/dropDown';
import TransactionsPdf from './transactionPdf';
import { useMediaQuery } from 'react-responsive';
import RadioGroup from '@mui/material/RadioGroup';
import { useDispatch, useSelector } from 'react-redux';
import TableSearchHandler from 'components/searchField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { transactionsList } from 'redux/transactions/actions';
import { StyledMainHeading, lightGrey, mainColor } from 'styles/global';
import { StyledExportButton, StyledDatepickerContainer } from './style';

const radiosButton = [
    { value: 'xlsx', label: '.XLSX' },
    { value: 'pdf', label: 'PDF' }
]

const Index = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(0)
    const searchDebounceTimerRef = useRef(null)
    const [selected, setSelected] = useState([])
    const [selectDate, setSelectDate] = useState()
    const isMobile = useMediaQuery({ maxWidth: 520 })
    const [searchQuery, setSearchQuery] = useState('')
    const [payload, setPayload] = useState(payloadData)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [exportValue, setExportValue] = useState('xlsx')
    const { loading, data } = useSelector((state) => state.transactionsReducers.list)
    const { totalRecords, list, advancePayments } = data
    const [filter, setFilter] = useState({
        advancePaymentPercentage: '',
    })

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props
        return (
            <div
                {...other}
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
                {value === index && (
                    <Box>
                        {children}
                    </Box>
                )}
            </div>
        )
    }

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }

    const exportContent = () => {
        return (
            <React.Fragment>
                <div className='icon'>
                    <img src={Icons.download} alt='download' />
                </div>

                <div className='text'>
                    <h3>Download</h3>
                    <RadioGroup
                        row
                        value={exportValue}
                        onChange={(e) => setExportValue(e.target.value)}
                        sx={{ justifyContent: 'center', paddingTop: '12px' }}
                    >
                        {radiosButton.map((item) => {
                            return (
                                <FormControlLabel
                                    key={item.value}
                                    value={item.value}
                                    label={item.label}
                                    control={
                                        <Radio
                                            sx={{
                                                color: lightGrey,
                                                '&.Mui-checked': {
                                                    color: mainColor,
                                                    'svg:last-child': {
                                                        transform: 'scale(1.3)'
                                                    }
                                                },
                                            }}
                                        />
                                    }
                                    sx={{
                                        marginLeft: '3px',
                                        marginRight: '15px',
                                        '& .MuiFormControlLabel-label': {
                                            color: '#FEFEFE',
                                            fontSize: '16px',
                                            fontWeight: '400',
                                            lineHeight: '121.4%',
                                            fontFamily: 'Poppins',
                                        },
                                    }}
                                />
                            )
                        })}
                    </RadioGroup>
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
                        onClick={() => {
                            handleExport()
                            setDialogOpen(false)
                        }}
                    >
                        Download
                    </button>
                </div>
            </React.Fragment>
        )
    }

    const getControlElements = () => {
        return (
            <div className='content_control-elements'>
                <div className='content_control-elements_filterbox'>
                    <StyledDatepickerContainer selectDate={selectDate}>
                        <DatePicker
                            isClearable
                            maxDate={new Date()}
                            selected={selectDate}
                            placeholderText="Date"
                            dateFormat="d MMM yyyy"
                            onChange={(date) => setSelectDate(date)}
                        />
                    </StyledDatepickerContainer>
                    <Dropdown
                        options={advancePayments}
                        name="advancePaymentPercentage"
                        defaultValue="Advance payments"
                        handleFilterChange={handleFilterChange}
                    />
                </div>
                <TableSearchHandler
                    value={searchQuery}
                    handleSearchQueryChange={handleSearchQueryChange}
                />
            </div>
        )
    }

    const clearFilters = () => {
        setFilter({
            price: '',
            advancePaymentPercentage: '',
        })
    }

    const buildCondition = (value, searchQuery) => {
        const condition = {}

        if (value === 1) {
            condition.isAdvance = true
        }

        if (filter) {
            if (filter.advancePaymentPercentage) {
                condition.advancePaymentPercentage = filter.advancePaymentPercentage
            }
        }

        if (selectDate) {
            condition.date = moment(selectDate).format("YYYY-MM-DD")
        }

        if (searchQuery) {
            condition.transactionId = { $ILike: searchQuery }
        }

        return condition
    }

    const delayedAPICallForSearch = (updatedPayload) => {
        dispatch(transactionsList(updatedPayload))
    }

    const handleSearchQueryChange = (value) => {
        setSearchQuery(value)
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: 5
        }))
    }

    const handleTabChange = (event, newValue) => {
        clearFilters()
        setSearchQuery("")
        setValue(newValue)
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: 5
        }))
    }

    const handleFilterChange = (name, value) => {
        setFilter({ ...filter, [name]: value })
        setPayload(prevData => ({
            ...prevData,
            page: 1,
        }))
    }

    const handleExport = async () => {
        if (exportValue === 'xlsx') {
            const xlsxData = selected.map(({ transactionId, customerName, providerName, advancePaymentPercentage, price, platformFee, date }) => ({
                'Transaction id': transactionId,
                'Customer name': customerName,
                'Service provider': providerName,
                'Advance': `${advancePaymentPercentage}% Advance`,
                'Price': `€${price}`,
                'Platform fee': `€${platformFee}`,
                'Date & Time': moment(date).format("DD MMM YYYY hh.mm A")
            }))

            const xlsxHeaders = [
                { label: "Transaction id", key: "Transaction id" },
                { label: "Customer name", key: "Customer name" },
                { label: "Service provider", key: "Service provider" },
                { label: "Advance", key: "Advance" },
                { label: "Price", key: "Price" },
                { label: "Platform fee", key: "Platform fee" },
                { label: "Date & Time", key: "Date & Time" },
            ]

            const xlsxFilename = 'transaction_data.xlsx'

            const xlsxExport = [
                xlsxHeaders,
                ...xlsxData
            ]

            const workbook = XLSX.utils.book_new()
            const worksheet = XLSX.utils.json_to_sheet(xlsxExport, { header: xlsxHeaders.map(header => header.label) })
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

            const workbookOutput = XLSX.write(workbook, {
                type: 'binary',
                bookType: 'xlsx',
            })

            const buffer = new ArrayBuffer(workbookOutput.length)
            const view = new Uint8Array(buffer)
            for (let i = 0; i < workbookOutput.length; i++) {
                view[i] = workbookOutput.charCodeAt(i) & 0xff
            }

            const blob = new Blob([buffer], { type: 'application/octet-stream' })

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, xlsxFilename)
            }
            else {
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = xlsxFilename
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                window.URL.revokeObjectURL(url)
            }
        }

        else if (exportValue === 'pdf') {
            const doc = pdf(<TransactionsPdf data={selected} />)
            const blob = await doc.toBlob()
            saveAs(blob, 'transaction_data.pdf')
        }

        setExportValue('xlsx')
    }

    useEffect(() => {
        const updatedPayload = {
            ...payload,
            condition: buildCondition(value, searchQuery)
        }

        if (searchQuery) {
            clearTimeout(searchDebounceTimerRef.current)
            searchDebounceTimerRef.current = setTimeout(() => {
                delayedAPICallForSearch(updatedPayload)
            }, 1000)
        }

        else {
            dispatch(transactionsList(updatedPayload))
        }

        return () => { clearTimeout(searchDebounceTimerRef.current) }

    }, [selectDate, value, filter, payload, dispatch])

    return (
        <LayoutContent>
            {dialogOpen && (
                <Dialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    content={exportContent()}
                />
            )}
            <div className='content'>
                <div className='content_header'>
                    <div className='content_header_heading'>
                        <StyledMainHeading>Transactions</StyledMainHeading>
                    </div>
                    <StyledExportButton
                        type='button'
                        disabled={selected.length === 0}
                        onClick={() => setDialogOpen(true)}
                        style={{
                            cursor: `${selected.length === 0 ? 'not-allowed' : 'pointer'}`
                        }}
                    >
                        <img src={Icons.exportAs} alt='export-as' />
                        Export
                    </StyledExportButton>
                </div>
                <div className='content_tabsPanel'>
                    <Box sx={{ width: '100%' }}>
                        <Box
                            sx={{
                                pt: 1,
                                borderBottom: 1,
                                borderColor: '#B6B6B7',
                                ...(isMobile && {
                                    pt: 0
                                }),
                            }}
                        >
                            <Tabs
                                value={value}
                                onChange={handleTabChange}
                                TabIndicatorProps={{ className: 'indicator-border' }}
                            >
                                <Tab label="All transactions" {...a11yProps(0)} />
                                <Tab label="Advance payments" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        {getControlElements()}
                        <TabPanel value={value} index={0}>
                            <Table
                                data={list}
                                payload={payload}
                                loading={loading}
                                selected={selected}
                                setPayload={setPayload}
                                setSelected={setSelected}
                                totalRecords={totalRecords}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Table
                                data={list}
                                payload={payload}
                                loading={loading}
                                selected={selected}
                                setPayload={setPayload}
                                setSelected={setSelected}
                                totalRecords={totalRecords}
                            />
                        </TabPanel>
                    </Box>
                </div>
            </div>
        </LayoutContent>
    )
}

export default Index