import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import Dropdown from 'components/dropDown';
import Skeleton from '@mui/material/Skeleton';
import { Chart as ChartJS } from 'chart.js/auto';
import { StyledGraph, StyledHeading } from './style';
import { mainColor, normalGrey } from 'styles/global';
import { useDispatch, useSelector } from 'react-redux';
import { graphOptions, dateFormatOptions } from 'utils';
import { transactionRevenue } from 'redux/transactions/actions';

const lgPadding = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 10,
}

const mdPadding = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
}

const Index = () => {
    const dispatch = useDispatch()
    const [noOfMonths, setNoOfMonths] = useState(null)
    const [width, setWidth] = useState(window.innerWidth)
    const [selectedDate, setSelectedDate] = useState(null)
    const { data, loading } = useSelector((state) => state.transactionsReducers.revenue)
    const { list, noOfMonths: noOfMonthsArr } = data
    const [graphData, setGraphData] = useState({
        labels: [],
        datasets: [],
        options: null,
    })

    window.addEventListener("resize", function () {
        setWidth(window.innerWidth)
    })

    const generateGraphData = (selectedDate = null, numberOfMonths = null) => {
        let limit
        const monthLabels = []
        const currentDate = new Date()
        let startDate = new Date(currentDate)
        const year = selectedDate ? selectedDate.getFullYear() : currentDate.getFullYear()

        if (selectedDate) {
            if (year !== currentDate.getFullYear()) {
                limit = numberOfMonths ? numberOfMonths : 12
                startDate = new Date(year, 0, 1)
            }
            else {
                startDate = new Date(currentDate.getFullYear(), 0, 1)
                if (numberOfMonths && numberOfMonths <= currentDate.getMonth() + 1) {
                    limit = numberOfMonths
                }
                else {
                    limit = currentDate.getMonth() + 1
                }
            }
        }

        else if (numberOfMonths === 12) {
            limit = numberOfMonths
            startDate.setFullYear(currentDate.getFullYear() - 1)
            startDate.setMonth(11)
        }

        else {
            limit = numberOfMonths ? numberOfMonths : 6
            startDate.setMonth(currentDate.getMonth() - limit + 1)
        }

        for (let i = 0; i < limit; i++) {
            const monthIndex = (startDate.getMonth() + i) % 12
            const monthName = new Date(year, monthIndex).toLocaleString('default', { month: 'short' })
            monthLabels.push(monthName)
        }

        const revenueArray = new Array(limit).fill(0)

        const filteredRevenue = list?.filter((item) => {
            let selectedEndDate
            let selectedStartDate
            const itemDate = new Date(item.month).toLocaleDateString('en-US', dateFormatOptions)
            const formattedDate = new Date(itemDate)
            formattedDate.setUTCHours(formattedDate.getUTCHours() - 8)

            if (selectedDate) {
                selectedStartDate = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    1
                )
            }
            else {
                selectedStartDate = new Date(
                    numberOfMonths === 12 ? year - 1 : year,
                    startDate.getMonth(),
                    1
                )
            }

            if (selectedDate && selectedDate.getFullYear() === currentDate.getFullYear()) {
                selectedEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
            }
            else {
                selectedEndDate = new Date(
                    selectedDate ? selectedDate.getFullYear() : year,
                    11,
                    31
                )
            }

            return (
                formattedDate >= selectedStartDate && formattedDate <= selectedEndDate
            )
        })

        filteredRevenue?.forEach(item => {
            const itemDate = new Date(item.month).toLocaleString('en-US', dateFormatOptions)
            const monthIndex = monthLabels.findIndex(month => {
                return (
                    new Date(itemDate).toLocaleString('default', { month: 'short' }) === month
                )
            })

            if (monthIndex !== -1) {
                revenueArray[monthIndex] = item.totalrevenue
            }
        })

        let minDataValue = Math.min(...revenueArray)
        let maxDataValue = Math.max(...revenueArray)
        let stepSize = Math.ceil((maxDataValue - minDataValue) / 5)

        if (minDataValue === 0 && maxDataValue === 0 && stepSize === 0) {
            minDataValue = maxDataValue = stepSize = 1
        }

        const graphDatasets = {
            fill: true,
            tension: 0.5,
            borderWidth: 2,
            pointRadius: 0,
            data: revenueArray,
            borderColor: mainColor,
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
        }

        const updatedOptions = {
            ...graphOptions,
            layout: {
                padding: width > 430 ? lgPadding : mdPadding
            },
            scales: {
                ...graphOptions.scales,
                y: {
                    stepSize,
                    ...graphOptions.scales.y,
                    suggestedMin: minDataValue,
                    suggestedMax: maxDataValue
                },
            },
        }

        const updatedData = {
            labels: monthLabels,
            options: updatedOptions,
            datasets: [graphDatasets],
        }

        setGraphData(updatedData)
    }

    const handleGraphData = (selectedDate, numberOfMonths) => {
        setNoOfMonths(numberOfMonths)
        generateGraphData(selectedDate, numberOfMonths)
    }

    useEffect(() => {
        dispatch(transactionRevenue({ successCallBack: generateGraphData }))
    }, [dispatch])

    return (
        <StyledGraph
            selectDate={selectedDate}
        >
            <div className='header'>
                <StyledHeading>Income/Service</StyledHeading>
                <div className='filter'>
                    <Dropdown
                        name=''
                        options={noOfMonthsArr}
                        defaultValue="Select months"
                        handleFilterChange={(name, value) => handleGraphData(selectedDate, value)}
                    />
                    <DatePicker
                        isClearable
                        showYearPicker
                        dateFormat="yyyy"
                        yearItemNumber={6}
                        maxDate={new Date()}
                        selected={selectedDate}
                        placeholderText="Select year"
                        onChange={(date) => {
                            setSelectedDate(date)
                            handleGraphData(date, noOfMonths)
                        }}
                    />
                </div>
            </div>
            {loading ? (
                <Skeleton
                    sx={{
                        height: '65%',
                        margin: '0 20px',
                        bgcolor: normalGrey,
                        transform: 'inherit',
                        '@media screen and (max-width: 1280px)': {
                            height: '40%'
                        },
                        '@media screen and (max-width: 520px)': {
                            height: '20%'
                        }
                    }}
                />
            ) : (
                <Line
                    height={220}
                    data={graphData}
                    options={graphData.options}
                />
            )}
        </StyledGraph>
    )
}

export default Index