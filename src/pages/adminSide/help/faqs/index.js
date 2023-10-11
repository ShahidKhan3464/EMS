import React, { useEffect } from 'react';
import Table from './table';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { faqsList, setSelectedTab } from 'redux/help/actions';

const Index = ({ payload, setPayload }) => {
    const dispatch = useDispatch()
    const { loading, value, data } = useSelector((state) => state.helpReducers.faqsList)
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
                    <Box sx={{ py: 2 }}>
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

    const handleTabChange = (event, newValue) => {
        dispatch(setSelectedTab(newValue))
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: 5
        }))
    }

    useEffect(() => {
        const userType = {
            0: 'CUSTOMER',
            1: 'SERVICE_PROVIDER',
        }
        const updatedPayload = {
            ...payload,
            condition: { userType: userType[value] },
        }
        dispatch(faqsList(updatedPayload))
    }, [value, payload, dispatch])

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: '#D9DBE9' }}>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    TabIndicatorProps={{ className: 'indicator-border' }}
                >
                    <Tab label="Customer FAQ’s" {...a11yProps(0)} />
                    <Tab label="Service provider FAQ’s" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Table
                    faqs={list}
                    value={value}
                    loading={loading}
                    payload={payload}
                    setPayload={setPayload}
                    totalRecords={totalRecords}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Table
                    faqs={list}
                    value={value}
                    payload={payload}
                    loading={loading}
                    setPayload={setPayload}
                    totalRecords={totalRecords}
                />
            </TabPanel>
        </Box>
    )
}

export default Index