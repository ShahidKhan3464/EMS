import React, { useEffect, useRef, useState } from 'react';
import Table from './table';
import LayoutContent from 'layout';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { payloadData } from 'utils';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import { StyledReportContainer } from './style';
import { reportsList } from 'redux/reports/actions';
import { useDispatch, useSelector } from 'react-redux';
import TableSearchHandler from 'components/searchField';
import { StyledMainHeading, mainColor } from 'styles/global';

const Index = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(0)
    const searchDebounceTimerRef = useRef(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeChip, setActiveChip] = useState('All')
    const { loading, data } = useSelector((state) => state.reportsReducers.reportsList)
    const [payload, setPayload] = useState(payloadData)
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
            2: 'SERVICE',
        }

        const condition = {
            queryType: "REPORT",
            reportedType: userType[value],
        }

        if (activeChip !== 'All') {
            condition.queryStatus = activeChip
        }

        if (searchValue) {
            condition.uniqueId = { $ILike: searchValue }
        }

        return condition
    }

    const delayedAPICallForSearch = (updatedPayload) => {
        dispatch(reportsList(updatedPayload))
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
                delayedAPICallForSearch(updatedPayload)
            }, 1000)
        }

        else {
            dispatch(reportsList(updatedPayload))
        }

        return () => { clearTimeout(searchDebounceTimerRef.current) }

    }, [value, activeChip, payload, dispatch])

    return (
        <LayoutContent>
            <StyledReportContainer>
                <div className='reports'>
                    <div className='reports_header'>
                        <StyledMainHeading>Reports</StyledMainHeading>
                    </div>
                    <div className='reports_content'>
                        <div className='reports_content_tabsPanel'>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: '#D9DBE9' }}>
                                    <Tabs
                                        value={value}
                                        onChange={handleTabChange}
                                        TabIndicatorProps={{ className: 'indicator-border' }}
                                    >
                                        <Tab label="Customers" {...a11yProps(0)} />
                                        <Tab label="Service providers" {...a11yProps(1)} />
                                        <Tab label="Services" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                {getControlElements()}
                                <TabPanel value={value} index={0}>
                                    <Table
                                        data={list}
                                        value={value}
                                        loading={loading}
                                        payload={payload}
                                        setPayload={setPayload}
                                        activeChip={activeChip}
                                        totalRecords={totalRecords}
                                        setActiveChip={setActiveChip}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Table
                                        data={list}
                                        value={value}
                                        loading={loading}
                                        payload={payload}
                                        setPayload={setPayload}
                                        activeChip={activeChip}
                                        totalRecords={totalRecords}
                                        setActiveChip={setActiveChip}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <Table
                                        data={list}
                                        value={value}
                                        loading={loading}
                                        payload={payload}
                                        setPayload={setPayload}
                                        activeChip={activeChip}
                                        totalRecords={totalRecords}
                                        setActiveChip={setActiveChip}
                                    />
                                </TabPanel>
                            </Box>
                        </div>
                    </div>
                </div>
            </StyledReportContainer>
        </LayoutContent>
    )
}

export default Index