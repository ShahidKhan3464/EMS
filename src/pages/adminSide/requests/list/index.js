import React, { useEffect, useState } from 'react';
import Table from './table';
import LayoutContent from 'layout';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { payloadData } from 'utils';
import Tabs from '@mui/material/Tabs';
import { useMediaQuery } from 'react-responsive';
import { StyledMainHeading } from 'styles/global';
import { useDispatch, useSelector } from 'react-redux';
import { serviceProvidersList } from 'redux/serviceProviders/actions';

const Index = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(0)
    const isMobile = useMediaQuery({ maxWidth: 520 })
    const [payload, setPayload] = useState(payloadData)
    const { loading, data } = useSelector((state) => state.serviceProvidersReducers.list)
    const { list, totalRecords } = data

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
                    <Box
                        sx={{
                            pt: 3,
                            ...(isMobile && {
                                pt: 2
                            }),
                        }}
                    >
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
        setValue(newValue)
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: 5
        }))
    }

    useEffect(() => {
        const profileStatus = {
            0: 'PENDING',
            1: 'REJECTED',
        }
        const updatedPayload = {
            ...payload,
            condition: {
                profileApprovedStatus: profileStatus[value]
            }
        }

        dispatch(serviceProvidersList(updatedPayload))
    }, [value, payload, dispatch])

    return (
        <LayoutContent>
            <div className='content'>
                <div className='content_heading'>
                    <StyledMainHeading>Requests</StyledMainHeading>
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
                                <Tab label="Pending requests" {...a11yProps(0)} />
                                <Tab label="Rejected requests" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Table
                                data={list}
                                value={value}
                                payload={payload}
                                loading={loading}
                                setPayload={setPayload}
                                totalRecords={totalRecords}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Table
                                data={list}
                                value={value}
                                payload={payload}
                                loading={loading}
                                setPayload={setPayload}
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