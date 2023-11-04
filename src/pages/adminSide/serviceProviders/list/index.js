import React, { useEffect, useRef, useState } from 'react';
import Table from './table';
import LayoutContent from 'layout';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Dropdown from 'components/dropDown';
import { useMediaQuery } from 'react-responsive';
import { StyledMainHeading } from 'styles/global';
import { useDispatch, useSelector } from 'react-redux';
import TableSearchHandler from 'components/searchField';
import { capitalizeFirstLetter, payloadData } from 'utils';
import { serviceProvidersList } from 'redux/serviceProviders/actions';

const bOptions = [{ value: 'block', text: 'Block' }]
const unBOptions = [{ value: 'unblock', text: 'Unblock' }, { value: 'view reason', text: 'View reason' }]

const Index = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(0)
    const searchDebounceTimerRef = useRef(null)
    const isMobile = useMediaQuery({ maxWidth: 520 })
    const [searchQuery, setSearchQuery] = useState('')
    const [payload, setPayload] = useState(payloadData)
    const [resetFilter, setResetFilter] = useState(false)
    const { loading, data } = useSelector((state) => state.serviceProvidersReducers.list)
    const { totalRecords, list, locations, serviceCategory, rating, status } = data
    const [filter, setFilter] = useState({
        status: '',
        rating: '',
        location: '',
        serviceCategory: '',
    })
    const isAnyFilterValueAssigned = Object.values(filter).some(value => !!value)

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

    const getControlElements = () => {
        return (
            <div className='content_control-elements'>
                <div className='content_control-elements_filterbox'>
                    <Dropdown
                        name="location"
                        options={locations}
                        defaultValue="Location"
                        resetFilter={resetFilter}
                        handleFilterChange={handleFilterChange}
                    />
                    <Dropdown
                        name="serviceCategory"
                        resetFilter={resetFilter}
                        options={serviceCategory}
                        defaultValue="Service category"
                        handleFilterChange={handleFilterChange}
                    />
                    <Dropdown
                        resetFilter={resetFilter}
                        name="rating"
                        options={rating}
                        defaultValue="Rating"
                        handleFilterChange={handleFilterChange}
                    />
                    {value === 0 && (
                        <Dropdown
                            name="status"
                            options={status}
                            defaultValue="Status"
                            resetFilter={resetFilter}
                            handleFilterChange={handleFilterChange}
                        />
                    )}
                    <button
                        type='button'
                        className='reset-filter'
                        onClick={handleResetFilter}
                        disabled={!isAnyFilterValueAssigned}
                        style={{
                            cursor: !isAnyFilterValueAssigned ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Reset filter
                    </button>
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
            status: '',
            rating: '',
            location: '',
            serviceCategory: '',
        })
    }

    const buildCondition = (value, searchQuery) => {
        const profileStatus = {
            0: false,
            1: true,
        }

        const condition = {
            profileApprovedStatus: 'APPROVED',
            block: profileStatus[value],
        }

        const applyFilterConditions = (condition) => {
            const { serviceCategory, rating, location, status } = filter

            if (serviceCategory) {
                condition.providerService = { categories: serviceCategory.toUpperCase() }
            }

            if (rating) {
                condition.rating = parseInt(rating)
            }

            if (location || status) {
                condition.profile = condition.profile || {}

                if (location) {
                    condition.profile.address = { $ILike: filter.location }
                }

                if (status) {
                    condition.profile.unavailable = status !== 'available'
                }
            }

            return condition
        }

        const applyFullNameConditions = (fullNameCondition) => {
            const { serviceCategory, rating, location, status } = filter

            if (location) {
                fullNameCondition.profile.address = capitalizeFirstLetter(location)
            }

            if (serviceCategory) {
                fullNameCondition.providerService = { categories: serviceCategory.toUpperCase() }
            }

            if (rating) {
                fullNameCondition.rating = parseInt(rating)
            }

            if (status) {
                fullNameCondition.profile.unavailable = status !== 'available'
            }

            return fullNameCondition
        }

        if (searchQuery) {
            const nameParts = searchQuery.split(" ")
            const firstName = nameParts[0]
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : firstName

            const fullNameCondition = [
                { ...condition, profile: { firstName: { $ILike: firstName } } },
                { ...condition, profile: { lastName: { $ILike: lastName } } }
            ]

            return fullNameCondition.map(filterCondition => applyFullNameConditions(filterCondition))
        }

        else {
            return applyFilterConditions(condition)
        }
    }

    const delayedAPICallForSearch = (updatedPayload) => {
        dispatch(serviceProvidersList(updatedPayload))
    }

    const handleResetFilter = () => {
        clearFilters()
        setResetFilter(true)
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
        setValue(newValue)
        setSearchQuery("")
        setResetFilter(true)
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: 5
        }))
    }

    const handleFilterChange = (name, value) => {
        setResetFilter(false)
        setFilter({ ...filter, [name]: value })
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
            dispatch(serviceProvidersList(updatedPayload))
        }

    }, [filter, payload, value, dispatch])

    return (
        <LayoutContent>
            <div className='content'>
                <div className='content_heading'>
                    <StyledMainHeading>Service provider</StyledMainHeading>
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
                                <Tab label="All service providers" {...a11yProps(0)} />
                                <Tab label="Blocked service providers" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        {getControlElements()}
                        <TabPanel value={value} index={0}>
                            <Table
                                data={list}
                                value={value}
                                payload={payload}
                                loading={loading}
                                options={bOptions}
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
                                options={unBOptions}
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