import React, { useEffect, useRef, useState } from 'react';
import Table from './table';
import LayoutContent from 'layout';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Dropdown from 'components/dropDown';
import { StyledMainHeading } from 'styles/global';
import { useDispatch, useSelector } from 'react-redux';
import TableSearchHandler from 'components/searchField';
import { customersList } from 'redux/customers/actions';
import { capitalizeFirstLetter, payloadData } from 'utils';

const blockOptions = [{ value: 'block', text: 'Block' }]
const unBlockOptions = [{ value: 'unblock', text: 'Unblock' }, { value: 'view reason', text: 'View reason' }]

const Index = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(0)
    const searchDebounceTimerRef = useRef(null)
    const [location, setLocation] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [payload, setPayload] = useState(payloadData)
    const [resetFilter, setResetFilter] = useState(false)
    const { loading, data } = useSelector((state) => state.customersReducers.list)
    const { totalRecords, list, locations } = data

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

    const buildCondition = (value, searchValue) => {
        const profileStatus = {
            0: false,
            1: true,
        }

        const condition = { block: profileStatus[value] }

        if (location) {
            if (!condition.profile) {
                condition.profile = {}
            }
            condition.profile.address = { $ILike: capitalizeFirstLetter(location) }
        }

        if (searchValue) {
            const nameParts = searchQuery.split(" ")
            const firstName = nameParts[0]
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : firstName

            const fullNameCondition = [
                { ...condition, profile: { firstName: { $ILike: firstName } } },
                { ...condition, profile: { lastName: { $ILike: lastName } } }
            ]

            if (location) {
                fullNameCondition.forEach((fullNameFilter) => {
                    fullNameFilter.profile.address = capitalizeFirstLetter(location)
                })
            }

            return fullNameCondition
        }

        else {
            return condition
        }
    }

    const delayedAPICallForSearch = (updatedPayload) => {
        dispatch(customersList(updatedPayload))
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
        setLocation("")
        setSearchQuery("")
        setValue(newValue)
        setResetFilter(true)
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: 5
        }))
    }

    const handleFilterChange = (name, value) => {
        setLocation(value)
        setResetFilter(false)
        setPayload(prevData => ({
            ...prevData,
            page: 1,
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
            dispatch(customersList(updatedPayload))
        }

        return () => { clearTimeout(searchDebounceTimerRef.current) }

    }, [value, payload, dispatch])

    return (
        <LayoutContent>
            <div className='content'>
                <div
                    className='content_top'
                    style={{
                        gap: '10px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <StyledMainHeading>Customer</StyledMainHeading>
                    <TableSearchHandler
                        value={searchQuery}
                        handleSearchQueryChange={handleSearchQueryChange}
                    />
                </div>
                <div className='content_tabsPanel'>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ pt: 1, borderBottom: 1, borderColor: '#B6B6B7' }}>
                            <Tabs
                                value={value}
                                onChange={handleTabChange}
                                TabIndicatorProps={{ className: 'indicator-border' }}
                            >
                                <Tab label="All customers" {...a11yProps(0)} />
                                <Tab label="Blocked customers" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <div className='content_control-elements'>
                            <div className='content_control-elements_filterbox'>
                                <Dropdown
                                    name="location"
                                    options={locations}
                                    defaultValue="Location"
                                    resetFilter={resetFilter}
                                    handleFilterChange={handleFilterChange}
                                />
                            </div>
                        </div>
                        <TabPanel value={value} index={0}>
                            <Table
                                data={list}
                                value={value}
                                payload={payload}
                                loading={loading}
                                options={blockOptions}
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
                                options={unBlockOptions}
                                totalRecords={totalRecords}
                            />
                        </TabPanel>
                    </Box>
                </div>
            </div>
        </LayoutContent >
    )
}

export default Index