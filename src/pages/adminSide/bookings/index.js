import React, { useEffect, useState } from 'react';
import Table from './table';
import LayoutContent from 'layout';
import Dropdown from 'components/dropDown';
import { StyledMainHeading } from 'styles/global';
import { bookingsList } from 'redux/bookings/actions';
import { useDispatch, useSelector } from 'react-redux';
import TableSearchHandler from 'components/searchField';
import { capitalizeFirstLetter, payloadData } from 'utils';

const Index = () => {
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('')
    const [payload, setPayload] = useState(payloadData)
    const [resetFilter, setResetFilter] = useState(false)
    const { loading, data } = useSelector((state) => state.bookingsReducers.list)
    const { totalRecords, list, locations, serviceCategory, priceRange, status } = data
    const [filter, setFilter] = useState({
        status: '',
        location: '',
        serviceCategory: '',
    })
    const isAnyFilterValueAssigned = Object.values(filter).some(value => !!value)

    const buildCondition = () => {
        const condition = {}

        if (filter.serviceCategory) {
            condition.providerService = { categories: capitalizeFirstLetter(filter.serviceCategory) }
        }

        // if (filter.location) {
        //     condition.location = filter.location
        // }

        // if (filter.status) {
        //     condition.bookedState = filter.status.toUpperCase()
        // }

        return condition
    }

    const clearFilters = () => {
        setFilter({
            status: '',
            location: '',
            serviceCategory: '',
        })
    }

    const handleSearchQueryChange = (value) => setSearchQuery(value.trim())

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
            condition: buildCondition(),
        }
        dispatch(bookingsList(updatedPayload))
    }, [filter, payload, dispatch])

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
                        <Dropdown
                            name="price"
                            options={priceRange}
                            resetFilter={resetFilter}
                            defaultValue="Price range"
                            handleFilterChange={handleFilterChange}
                        />
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
        </LayoutContent>
    )
}

export default Index