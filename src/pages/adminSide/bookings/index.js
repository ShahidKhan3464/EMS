import React, { useEffect, useRef, useState } from 'react';
import Table from './table';
import LayoutContent from 'layout';
import { payloadData } from 'utils';
import Dropdown from 'components/dropDown';
import { StyledMainHeading } from 'styles/global';
import { bookingsList } from 'redux/bookings/actions';
import { useDispatch, useSelector } from 'react-redux';
import PriceRangeButton from 'components/priceRangeBtn';
import TableSearchHandler from 'components/searchField';
import PriceRangeContent from 'components/priceRangeContent';

const Index = () => {
    const dispatch = useDispatch()
    const searchDebounceTimerRef = useRef(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [payload, setPayload] = useState(payloadData)
    const [resetFilter, setResetFilter] = useState(false)
    const { loading, data } = useSelector((state) => state.bookingsReducers.list)
    const [priceRange, setPriceRange] = useState({ isSelect: false, values: null })
    const { totalRecords, list, locations, serviceCategory, status } = data
    const [filter, setFilter] = useState({
        status: '',
        location: '',
        serviceCategory: '',
    })
    const isAnyFilterValueAssigned = Object.values(filter).some(value => !!value)

    const buildCondition = (searchValue) => {
        const condition = {}

        if (filter) {
            if (filter.serviceCategory) {
                condition.providerService = { categories: filter.serviceCategory.toUpperCase() }
            }

            if (filter.status) {
                condition.bookedState = filter.status.toUpperCase()
            }

            if (filter.location) {
                condition.location = { $ILike: filter.location }
            }
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

    const clearFilters = () => {
        setFilter({
            status: '',
            location: '',
            serviceCategory: '',
        })
        setPriceRange({ isSelect: false, values: null })
    }

    const delayedAPICallForSearch = (updatedPayload) => {
        dispatch(bookingsList(updatedPayload))
    }

    const handleSearchQueryChange = (value) => {
        setSearchQuery(value)
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: 5
        }))
    }

    const handleResetFilter = () => {
        clearFilters()
        setResetFilter(true)
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
            condition: buildCondition(searchQuery),
        }

        if (searchQuery) {
            clearTimeout(searchDebounceTimerRef.current)
            searchDebounceTimerRef.current = setTimeout(() => {
                delayedAPICallForSearch(updatedPayload)
            }, 1000)
        }

        else {
            dispatch(bookingsList(updatedPayload))
        }

        return () => { clearTimeout(searchDebounceTimerRef.current) }

    }, [priceRange.values, filter, payload, dispatch])

    return (
        <LayoutContent>
            <div className='content'>
                <div className='content_heading'>
                    <StyledMainHeading>Bookings</StyledMainHeading>
                </div>
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
                            name="status"
                            options={status}
                            defaultValue="Status"
                            resetFilter={resetFilter}
                            handleFilterChange={handleFilterChange}
                        />
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
                <Table
                    data={list}
                    payload={payload}
                    loading={loading}
                    setPayload={setPayload}
                    totalRecords={totalRecords}
                />
            </div>
        </LayoutContent >
    )
}

export default Index