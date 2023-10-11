import React, { useState } from 'react';
import { StyledGraph } from './style';
import { Line } from 'react-chartjs-2';
import { mainColor } from 'styles/global';
import Skeleton from '@mui/material/Skeleton';
import { Chart as ChartJS } from 'chart.js/auto';

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

const data = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'May', 'JUN'],
    datasets: [
        {
            fill: true,
            tension: 0.5,
            borderWidth: 2,
            pointRadius: 0,
            hoverRadius: 10,
            borderColor: mainColor,
            pointBackgroundColor: mainColor,
            data: [440, 620, 650, 440, 800, 410],
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
        },
    ]
}

const Index = () => {
    const [loading, setLoading] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)

    window.addEventListener("resize", function () {
        setWidth(window.innerWidth)
    })

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        interaction: {
            padding: 15,
            boxWidth: 0,
            boxHeight: 0,
            mode: 'index',
            caretSize: 10,
            bodySpacing: 10,
            cornerRadius: 10,
            intersect: false,
            bodyAlign: 'right',
            bodyColor: '#C29137',
            titleMarginBottom: 10,
            titleColor: '#CFCFCF',
            backgroundColor: '#090D1F',
            titleFont: {
                size: 12,
                weight: 'normal',
                family: 'Poppins',
            },
            bodyFont: {
                size: 16,
                weight: 'bold',
                family: 'Poppins',
            },
            callbacks: {
                title: () => 'INCOME',
                label: (context) => {
                    let label = context.dataset.label || ''
                    if (label) {
                        label += ': '
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y)
                    }
                    return label
                },
                afterBody: (context) => {
                    const monthIndex = context[0].dataIndex
                    if (monthIndex === 0) {
                        return []
                    }
                    else {
                        const tooltipItems = []
                        const currentIncome = context[0].parsed.y
                        const dataset = context[0].chart.data.datasets[0]
                        const expenses = dataset.data
                        const previousIncome = expenses[monthIndex - 1]
                        const profit = currentIncome - previousIncome
                        const profitPercentage = ((profit / previousIncome) * 100).toFixed(0)

                        if (profit > 0) {
                            tooltipItems.push(`+ ${profitPercentage}%`)
                        }
                        else if (profit < 0) {
                            tooltipItems.push(` ${profitPercentage}%`)
                        }
                        else {
                            tooltipItems.push(`${profitPercentage}%`)
                        }
                        return tooltipItems
                    }
                },
            }
        },
        layout: {
            padding: width > 430 ? lgPadding : mdPadding
        },
        scales: {
            y: {
                stepSize: 200,
                suggestedMin: 0,
                suggestedMax: 1200,
                grid: { display: false },
                border: { display: false },
                ticks: {
                    color: 'rgba(251, 251, 252, 0.5)',
                    font: {
                        size: 12,
                        style: 'normal',
                        family: 'Poppins',
                    },
                },
            },

            x: {
                grid: { display: false },
                border: { display: false },
                ticks: {
                    color: 'rgba(218, 219, 220, 0.5)',
                    font: {
                        size: 12,
                        style: 'normal',
                        family: 'Poppins',
                    },
                },
            }
        }
    }

    // const generateGraphData = (subscriptions, value) => {

    //     const limit = value ? value : 6
    //     const plans = Array.from(new Set(subscriptions.map((subscription) => subscription.planType)))

    //     const planMonths = {}
    //     plans.forEach((plan) => {
    //         planMonths[plan] = []
    //     })

    //     const getColor = (plan) => {
    //         switch (plan.toLowerCase()) {
    //             case 'basic':
    //                 return '#46DE70'
    //             case 'standard':
    //                 return '#962DFF'
    //             case 'premium':
    //                 return '#FF718B'
    //             default:
    //                 break
    //         }
    //     }

    //     const earliestSubscriptionDate = new Date(Math.min(...subscriptions.map((subscription) => subscription.date)))
    //     const currentMonth = earliestSubscriptionDate.getMonth()
    //     const currentYear = earliestSubscriptionDate.getFullYear()

    //     const monthLabels = []

    //     for (let i = 0; i < limit; i++) {
    //         const monthIndex = (currentMonth + i) % 12
    //         const year = currentYear + Math.floor((currentMonth + i) / 12)

    //         const monthName = new Date(year, monthIndex).toLocaleString('default', { month: 'short' })
    //         monthLabels.push(monthName)

    //         plans.forEach((plan) => {
    //             const matchingSubscriptions = subscriptions.filter((subscription) => subscription.planType === plan)
    //             const matchingSubscriptionsInMonth = matchingSubscriptions.filter((subscription) => {
    //                 const subscriptionMonth = subscription.date.getMonth()
    //                 const subscriptionYear = subscription.date.getFullYear()
    //                 return subscriptionMonth === monthIndex && subscriptionYear === year
    //             })

    //             planMonths[plan].push(matchingSubscriptionsInMonth.length)
    //         })
    //     }

    //     const graphDatasets = Object.keys(planMonths).map((plan) => ({
    //         label: plan,
    //         fill: false,
    //         tension: 0.5,
    //         borderWidth: 3,
    //         pointRadius: 0,
    //         borderDash: [12, 12],
    //         borderStyle: 'dashed',
    //         data: planMonths[plan],
    //         borderColor: getColor(plan),
    //     }))

    //     const minDataValue = Math.min(...graphDatasets.flatMap((dataset) => dataset.data))
    //     const maxDataValue = Math.max(...graphDatasets.flatMap((dataset) => dataset.data))
    //     const stepSize = Math.ceil((maxDataValue - minDataValue) / 5)

    //     const yAxesOptions = {
    //         stepSize: stepSize,
    //         suggestedMin: minDataValue,
    //         suggestedMax: maxDataValue,
    //         border: { display: false },
    //         grid: { color: '#E5E5EF' },
    //         ticks: {
    //             borderWidth: 2,
    //             color: '#615E83',
    //             font: {
    //                 size: 14,
    //                 weight: '400',
    //                 style: 'normal',
    //                 lineHeight: '18px',
    //                 family: 'SF Pro Text',
    //             },
    //         },
    //     }

    //     const xAxesOptions = {
    //         grid: { display: false },
    //         border: { display: false },
    //         ticks: {
    //             color: '#615E83',
    //             font: {
    //                 size: 12,
    //                 weight: '400',
    //                 style: 'normal',
    //                 lineHeight: '16px',
    //                 family: 'SF Pro Text',
    //             },
    //         },
    //     }

    //     const updatedOptions = {
    //         responsive: true,
    //         plugins: {
    //             legend: {
    //                 display: false,
    //             },
    //         },
    //         scales: {
    //             y: yAxesOptions,
    //             x: xAxesOptions,
    //         },
    //     }

    //     return {
    //         labels: monthLabels,
    //         datasets: graphDatasets,
    //         options: updatedOptions,
    //     }
    // }

    // const handleGraphData = (data, value) => {
    //     const updatedData = generateGraphData(data, value)
    //     setGraphData(updatedData)
    // }

    // const getData = useCallback(async () => {
    //     try {
    //         const response = await api.get('/payment/transactions')
    //         const subscriptions = response.data.result.data.data?.map(item => {
    //             return {
    //                 date: new Date(item.period_start * 1000),
    //                 planType: getPlanType(item.lines.data[0].description),
    //             }
    //         })
    //         if (subscriptions) {
    //             const updatedData = generateGraphData(subscriptions)
    //             setData(subscriptions)
    //             setGraphData(updatedData)
    //             setOptions(updatedData.options)
    //         }
    //         setLoading(false)
    //     }
    //     catch (error) {
    //         const tokenExpired = error.response?.data.message
    //         if (tokenExpired === 'Token expired, access denied') {
    //             localStorage.clear()
    //             navigate("/")
    //             return
    //         }
    //         SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
    //     }
    // }, [])

    // useEffect(() => {
    //     getData()
    // }, [getData])

    // useEffect(() => {
    //     if (chartRef.current) {
    //         ChartJS.register({
    //             id: 'onClickLabel',
    //             beforeEvent(chart, args, options) {
    //                 const [event] = args;
    //                 const { element } = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true)[0] || {};

    //                 if (element && options.onClick) {
    //                     options.onClick(event, [element]);
    //                 }
    //             },
    //         });

    //         const chartInstance = chartRef.current.chartInstance;
    //         // chartInstance.pluginService.register({
    //         //     id: 'onClickLabel',
    //         //     beforeEvent: 'beforeEvent',
    //         //     onClick: options.plugins.onClickLabel.onClick,
    //         // });
    //     }
    // }, []);

    return (
        <StyledGraph>
            <div className='header'>
                <h3>Income/Service</h3>
                {/* <div className='select-month'>
                    <Dropdown
                        name=''
                        options={months}
                        defaultValue="Select months"
                        handleFilterChange={(name, value) => handleGraphData(data, value)}
                    />
                </div> */}
            </div>
            {loading ? (
                <Skeleton
                    animation="wave"
                    sx={{
                        height: '65%',
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
                    data={data}
                    height={145}
                    options={options}
                />
            )}
        </StyledGraph>
    )
}

export default Index