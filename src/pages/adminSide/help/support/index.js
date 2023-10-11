import React, { useEffect, useRef, useState } from 'react';
import Table from './table';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { payloadData } from 'utils';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import { mainColor } from 'styles/global';
import { queriesList } from 'redux/help/actions';
import { useDispatch, useSelector } from 'react-redux';
import TableSearchHandler from 'components/searchField';

const Index = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(0)
    const searchDebounceTimerRef = useRef(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [payload, setPayload] = useState(payloadData)
    const [activeChip, setActiveChip] = useState('All')
    const { loading, data } = useSelector((state) => state.helpReducers.queriesList)
    const { totalRecords, list } = data

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

    const filterReportByStatus = (status) => {
        setActiveChip(status)
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: 5
        }))
    }

    const getControlElements = () => {
        return (
            <div className='content_control-elements'>
                <div className='stacks'>
                    <Chip
                        label="All"
                        variant="outlined"
                        onClick={() => filterReportByStatus('All')}
                        sx={{
                            color: activeChip === 'All' ? '#FFF' : '#FDFDFD',
                            backgroundColor: activeChip === 'All' ? mainColor : '#424242',
                            '&:hover': {
                                backgroundColor: `${mainColor} !important`,
                            },
                        }}
                    />
                    <Chip
                        label="Pending"
                        variant="outlined"
                        onClick={() => filterReportByStatus('PENDING')}
                        sx={{
                            color: activeChip === 'PENDING' ? '#FFF' : '#FDFDFD',
                            backgroundColor: activeChip === 'PENDING' ? mainColor : '#424242',
                            '&:hover': {
                                backgroundColor: `${mainColor} !important`,
                            },
                        }}
                    />
                    <Chip
                        variant="outlined"
                        label="In progress"
                        onClick={() => filterReportByStatus('IN_PROGRESS')}
                        sx={{
                            color: activeChip === 'IN_PROGRESS' ? '#FFF' : '#FDFDFD',
                            backgroundColor: activeChip === 'IN_PROGRESS' ? mainColor : '#424242',
                            '&:hover': {
                                backgroundColor: `${mainColor} !important`,
                            },
                        }}
                    />
                    <Chip
                        label="Closed"
                        variant="outlined"
                        onClick={() => filterReportByStatus('CLOSED')}
                        sx={{
                            color: activeChip === 'CLOSED' ? '#FFF' : '#FDFDFD',
                            backgroundColor: activeChip === 'CLOSED' ? mainColor : '#424242',
                            '&:hover': {
                                backgroundColor: `${mainColor} !important`,
                            },
                        }}
                    />
                </div>
                <TableSearchHandler
                    value={searchQuery}
                    handleSearchQueryChange={handleSearchQueryChange}
                />
            </div>
        )
    }

    const buildCondition = (value, searchValue) => {
        const userType = {
            0: 'CUSTOMER',
            1: 'SERVICE_PROVIDER',
        }

        const condition = {
            queryType: "SUPPORT",
            userType: userType[value]
        }

        if (activeChip !== 'All') {
            condition.queryStatus = activeChip
        }

        if (searchValue) {
            condition.uniqueId = { $ILike: searchValue }
        }

        return condition
    }

    const delayedAPICall = (updatedPayload) => {
        dispatch(queriesList(updatedPayload))
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
        setValue(newValue)
        setSearchQuery("")
        setActiveChip('All')
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: 5
        }))
    }

    useEffect(() => {
        const updatedPayload = {
            ...payload,
            condition: buildCondition(value, searchQuery),
        }

        if (searchQuery) {
            clearTimeout(searchDebounceTimerRef.current)
            searchDebounceTimerRef.current = setTimeout(() => {
                delayedAPICall(updatedPayload)
            }, 1000)
        }

        else {
            dispatch(queriesList(updatedPayload))
        }

        return () => { clearTimeout(searchDebounceTimerRef.current) }

    }, [value, activeChip, payload, dispatch])

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: '#D9DBE9' }}>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    TabIndicatorProps={{ className: 'indicator-border' }}
                >
                    <Tab label="Customers" {...a11yProps(0)} />
                    <Tab label="Service providers" {...a11yProps(1)} />
                </Tabs>
            </Box>
            {getControlElements()}
            <TabPanel value={value} index={0}>
                <Table
                    data={list}
                    loading={loading}
                    payload={payload}
                    setPayload={setPayload}
                    totalRecords={totalRecords}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Table
                    data={list}
                    loading={loading}
                    payload={payload}
                    setPayload={setPayload}
                    totalRecords={totalRecords}
                />
            </TabPanel>
        </Box>
    )
}

export default Index