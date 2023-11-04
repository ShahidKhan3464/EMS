import React, { useEffect, useRef, useState } from 'react';
import Table from './table';
import LayoutContent from 'layout';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Dropdown from 'components/dropDown';
import { useMediaQuery } from 'react-responsive';
import { StyledMainHeading } from 'styles/global';
import { servicesList } from 'redux/services/actions';
import { useDispatch, useSelector } from 'react-redux';
import TableSearchHandler from 'components/searchField';
import PriceRangeButton from 'components/priceRangeBtn';
import { capitalizeFirstLetter, payloadData } from 'utils';
import PriceRangeContent from 'components/priceRangeContent';

const activeOptions = [{ value: 'active', text: 'Active' }, { value: 'view reason', text: 'View reason' }]
const unActiveOptions = [{ value: 'inactive', text: 'In active' }]

const Index = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(0)
    const searchDebounceTimerRef = useRef(null)
    const isMobile = useMediaQuery({ maxWidth: 520 })
    const [searchQuery, setSearchQuery] = useState('')
    const [payload, setPayload] = useState(payloadData)
    const [resetFilter, setResetFilter] = useState(false)
    const { loading, data } = useSelector((state) => state.servicesReducers.list)
    const [priceRange, setPriceRange] = useState({ isSelect: false, values: null })
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
                    <PriceRangeButton
                        priceRange={priceRange.values}
                        clicked={() => setPriceRange({ ...priceRange, isSelect: true })}
                        setPriceRange={() => setPriceRange({ ...priceRange, values: null })}
                    />
                    {priceRange.isSelect && (
                        <PriceRangeContent
                            setPriceRange={(data) => {
                                setPriceRange({ isSelect: false, values: data ? data : null })
                                setPayload(prevData => ({
                                    ...prevData,
                                    page: 1,
                                    pageSize: 5
                                }))
                            }}
                        />
                    )}
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
            service: '',
            location: '',
        })
        setPriceRange({ isSelect: false, values: null })
    }

    const buildCondition = (value, searchValue) => {
        const serviceStatus = {
            0: 'ACTIVE',
            1: 'INACTIVE',
        }

        const condition = { serviceStatus: serviceStatus[value] }

        if (filter) {
            if (filter.serviceCategory) {
                condition.categories = filter.serviceCategory.toUpperCase()
            }

            if (filter.rating) {
                condition.rating = parseInt(filter.rating)
            }

            if (filter.status) {
                condition.unavailable = filter.status !== 'available'
            }

            if (filter.location) {
                condition.city = capitalizeFirstLetter(filter.location)
            }
        }

        if (searchValue) {
            condition.name = { $ILike: searchValue }
            return [condition]
        }

        if (priceRange.values) {
            condition.price = { $Between: priceRange.values.from + "," + priceRange.values.to }
        }

        return condition
    }

    const delayedAPICallForSearch = (updatedPayload) => {
        dispatch(servicesList(updatedPayload))
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
            dispatch(servicesList(updatedPayload))
        }

        return () => { clearTimeout(searchDebounceTimerRef.current) }

    }, [priceRange.values, value, filter, payload, dispatch])

    return (
        <LayoutContent>
            <div className='content'>
                <div className='content_heading'>
                    <StyledMainHeading>Services</StyledMainHeading>
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
                                <Tab label="All services" {...a11yProps(0)} />
                                <Tab label="Inactive services" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        {getControlElements()}
                        <TabPanel value={value} index={0}>
                            <Table
                                data={list}
                                value={value}
                                payload={payload}
                                loading={loading}
                                setPayload={setPayload}
                                options={unActiveOptions}
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
                                options={activeOptions}
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