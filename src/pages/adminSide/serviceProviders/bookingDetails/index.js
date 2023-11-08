import React, { useEffect, useRef, useState } from 'react';
import Table from './table';
import { Icons } from 'assets';
import LayoutContent from 'layout';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { capitalizeFirstLetter, payloadData } from 'utils';
import Tabs from '@mui/material/Tabs';
import Dropdown from 'components/dropDown';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { StyledMainHeading } from 'styles/global';
import { useDispatch, useSelector } from 'react-redux';
import TableSearchHandler from 'components/searchField';
import PriceRangeButton from 'components/priceRangeBtn';
import PriceRangeContent from 'components/priceRangeContent';
import { serviceProviderBookingDetails } from 'redux/serviceProviders/actions';

const Index = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [value, setValue] = useState(0)
    const searchDebounceTimerRef = useRef(null)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [searchQuery, setSearchQuery] = useState('')
    const [payload, setPayload] = useState(payloadData)
    const [priceRange, setPriceRange] = useState({ isSelect: false, values: null })
    const { loading, data } = useSelector((state) => state.serviceProvidersReducers.bookingDetails)
    const { list, totalRecords, serviceCategory } = data
    const [filter, setFilter] = useState({
        serviceCategory: '',
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

    const getControlElements = () => {
        return (
            <div className='content_control-elements'>
                <div className='content_control-elements_filterbox'>
                    <Dropdown
                        name="serviceCategory"
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
            serviceCategory: '',
        })
    }

    const buildCondition = (value, searchValue) => {
        const bookingStatus = {
            0: 'COMPLETED_BY_CUSTOMER',
            1: 'IN_PROGRESS',
        }

        const condition = { bookedState: bookingStatus[value], providerService: { user: { id } } }

        if (filter && filter.serviceCategory) {
            condition.providerService.categories = capitalizeFirstLetter(filter.serviceCategory);
        }

        if (priceRange.values) {
            if (!condition.providerService) {
                condition.providerService = {}
            }

            condition.providerService.price = {
                $Between: priceRange.values.from + "," + priceRange.values.to
            }
        }

        if (searchValue) {
            condition.uniqueId = { $ILike: searchValue }
            return [condition]
        }

        return condition
    }

    const delayedAPICallForSearch = (updatedPayload) => {
        dispatch(serviceProviderBookingDetails({ data: updatedPayload }))
    }

    const handleSearchQueryChange = (value) => {
        setSearchQuery(value)
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: 5
        }))
    }

    const handleFilterChange = (name, value) => {
        setPage(1)
        setFilter({ ...filter, [name]: value })
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
            dispatch(serviceProviderBookingDetails({ data: updatedPayload }))
        }

        return () => { clearTimeout(searchDebounceTimerRef.current) }

    }, [priceRange.values, value, filter, payload, dispatch])

    return (
        <LayoutContent>
            <div className='content'>
                <div
                    className='content_header'
                    style={{ flexDirection: 'row-reverse', justifyContent: 'flex-end' }}
                >
                    <StyledMainHeading>Booking details</StyledMainHeading>
                    <button
                        type='button'
                        onClick={() => navigate(-1)}
                    >
                        <img src={Icons.backBtn} alt='back-arrow' />
                    </button>
                </div>

                <div className='content_tabsPanel'>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: '#B6B6B7' }}>
                            <Tabs
                                value={value}
                                onChange={handleTabChange}
                                TabIndicatorProps={{ className: 'indicator-border' }}
                            >
                                <Tab label="Completed bookings" {...a11yProps(0)} />
                                <Tab label="In progress bookings" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        {getControlElements()}
                        <TabPanel value={value} index={0}>
                            <Table
                                page={page}
                                data={list}
                                setPage={setPage}
                                loading={loading}
                                payload={payload}
                                setPayload={setPayload}
                                rowsPerPage={rowsPerPage}
                                totalRecords={totalRecords}
                                setRowsPerPage={setRowsPerPage}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Table
                                page={page}
                                data={list}
                                setPage={setPage}
                                loading={loading}
                                payload={payload}
                                setPayload={setPayload}
                                rowsPerPage={rowsPerPage}
                                totalRecords={totalRecords}
                                setRowsPerPage={setRowsPerPage}
                            />
                        </TabPanel>
                    </Box>
                </div>
            </div>
        </LayoutContent>
    )
}

export default Index