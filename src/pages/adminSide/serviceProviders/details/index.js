import React, { useEffect, useState } from 'react';
import { Icons } from 'assets';
import Profile from './profile';
import List from './servicesList';
import LayoutContent from 'layout';
import Tab from '@mui/material/Tab';
import { payloadData } from 'utils';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Dialog from 'components/dialog';
import { StyledServices } from './style';
import { useParams } from 'react-router-dom';
import ServiceDetails from './serviceDetails';
import FormDialog from 'components/formDialog';
import { useDispatch, useSelector } from 'react-redux';
import ReasonOfBlockingForm from '../reasonOfBlockingForm';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledDetailContent, StyledLoadingContainer, StyledMainHeading } from 'styles/global';
import { serviceProviderBlockUnBlock, serviceProviderBookingDetails, serviceProviderDetails } from 'redux/serviceProviders/actions';

const services = [
    {
        category: 'Location',
        subcategories: ['Restaurant', 'Outdoor', 'Pool Party', 'Estates'],
    },
    {
        category: 'Music',
        subcategories: ['Singer', 'DJ', 'Band'],
    },
    {
        category: 'Entertainment',
        subcategories: ['MC', 'Fate tellers', 'Magician', 'Stand-up', 'Luxury car', 'Helocopter', 'Dancers'],
    },
    {
        category: 'Staging',
        subcategories: ['Flowers', 'Decoration', 'Invite cards', 'Photographer', 'Videography'],
    },
    {
        category: 'Catering',
        subcategories: ['Sweet', 'Sour', 'Waiter', 'Chef'],
    },
]

const Index = () => {
    const isDetailPage = true
    const { id } = useParams()
    const dispatch = useDispatch()
    const [value, setValue] = useState(0)
    const [selected, setSelected] = useState('All')
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [servicesByCategory, setServicesByCategory] = useState([])
    const [showServiceDetails, setShowServiceDetails] = useState(false)
    const [servicesBySubCategories, setServicesBySubCategories] = useState([])
    const [subCategoriesByCategory, setSubCategoriesByCategory] = useState([])
    const { loading, data } = useSelector((state) => state.serviceProvidersReducers.details)
    const { list } = useSelector((state) => state.serviceProvidersReducers.bookingDetails.data)
    const { loading: serviceLoading, data: serviceDetails } = useSelector((state) => state.servicesReducers.details)
    const updatedPayload = {
        ...payloadData,
        condition: { bookedState: "IN_PROGRESS", providerService: { user: { id } } }
    }

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
                    <Box sx={{ py: 3 }}>
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

    const calculateTotalAmount = (booking) => {
        if (booking.providerService.pricingOption === "PER_HOUR") {
            return booking.providerService.price * booking.providerService.hours
        }
        else {
            return booking.providerService.price
        }
    }

    const calculateTotalAmountForAllBookings = (bookings) => {
        let totalAmount = 0

        for (const booking of bookings) {
            totalAmount += calculateTotalAmount(booking)
        }

        return totalAmount
    }

    const totalAmount = calculateTotalAmountForAllBookings(list)

    const contentRendering = () => {
        let content = ''
        if (!list.length) {
            content = `Are you sure you want to ${dialogType === 'block' ? 'block' : dialogType === 'unblock' && 'unblock'} this service provider?`
        }
        else {
            content = `If you want to block this service provider, you have to refund €${totalAmount} against the ${list.length} inprogress services. Are you sure you want to block this service provider?`
        }
        return content
    }

    const blockUnblockContent = () => {
        return (
            <React.Fragment>
                <div className='icon'>
                    <img src={Icons.setting} alt='setting-icon' />
                </div>

                <div className='text'>
                    <h3>
                        {dialogType === 'block' ? 'Block' : dialogType === 'unblock' && 'Unblock'}
                    </h3>
                    <p>
                        {contentRendering()}
                    </p>
                </div>

                <div className='btn-container'>
                    <button
                        type='button'
                        className='cancel-btn'
                        onClick={() => setDialogOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        className='control-btn'
                        onClick={async () => {
                            if (dialogType === 'block') {
                                setDialogType('reason')
                                return
                            }
                            const obj = { block: false }
                            await dispatch(serviceProviderBlockUnBlock(id, obj))
                            dispatch(serviceProviderDetails(id))
                            setDialogOpen(false)
                        }}
                    >
                        {dialogType === 'block' ? 'Block' : dialogType === 'unblock' && 'Unblock'}
                    </button>
                </div>
            </React.Fragment>
        )
    }

    const filteredServicesBySubCategories = (value) => {
        const selectedTabText = subCategoriesByCategory[value]
        const filteredServicesBySubCategories = servicesByCategory.filter(service => service.subCategories.split(" ")[0].toLowerCase() === selectedTabText.toLowerCase())
        setServicesBySubCategories(filteredServicesBySubCategories)
    }

    const refundPolicy = (id, isBoolean, option) => {
        setDialogType(option)
        setDialogOpen(isBoolean)
    }

    const handleTabChange = (event, newValue) => {
        setValue(newValue)
        setShowServiceDetails(false)
        filteredServicesBySubCategories(newValue)
    }

    const handleCategoryButton = (category) => {
        setValue(0)
        setSelected(category)
        setShowServiceDetails(false)
        const subCategoriesByCategory = services.find(service => service.category === category)?.subcategories || []
        const filteredServicesByCategory = data.providerService.filter(service => service.categories.toLowerCase() === category.toLowerCase())
        setServicesByCategory(filteredServicesByCategory)
        setSubCategoriesByCategory(subCategoriesByCategory)
    }

    useEffect(() => {
        if (servicesByCategory.length === 0) {
            setServicesBySubCategories([])
            return
        }
        filteredServicesBySubCategories(value)
    }, [value, servicesByCategory])

    useEffect(() => {
        dispatch(serviceProviderDetails(id))
    }, [id, dispatch])

    return (
        <LayoutContent>
            {dialogOpen && ['block', 'unblock'].includes(dialogType)
                ? (
                    <Dialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        content={blockUnblockContent()}
                    />
                ) : dialogType === 'reason' && (
                    <FormDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        title="Reason of blocking"
                        formContent={
                            <ReasonOfBlockingForm
                                id={id}
                                setOpen={setDialogOpen}
                                isDetailPage={isDetailPage}
                            />
                        }
                    />
                )}
            <StyledDetailContent>
                <div className='header'>
                    <div className='heading'>
                        <StyledMainHeading>Service provider</StyledMainHeading>
                    </div>
                    {!loading && (
                        <div className='btn-container'>
                            {data.block ? (
                                <button
                                    type='button'
                                    className='unblock-btn'
                                    onClick={() => {
                                        setDialogOpen(true)
                                        setDialogType('unblock')
                                    }}
                                >
                                    Unblock
                                </button>
                            ) : (
                                <button
                                    type='button'
                                    className='block-btn'
                                    onClick={() => {
                                        dispatch(serviceProviderBookingDetails({ data: updatedPayload, successCallBack: refundPolicy }))
                                    }}
                                >
                                    Block
                                </button>
                            )}
                        </div>
                    )}
                </div>
                {loading ? (
                    <StyledLoadingContainer>
                        <CircularProgress />
                    </StyledLoadingContainer>
                ) : (
                    <React.Fragment>
                        <Profile
                            id={data.id}
                            email={data.email}
                            rating={data.rating}
                            profile={data.profile}
                            noOfOrder={data.booking?.length}
                            noOfServices={data.providerService?.length}
                            vatCer={data.companyProfile?.[0]?.vatCertificate}
                        />
                        <StyledServices>
                            <div className='title'>
                                <h3>Services</h3>
                                {showServiceDetails && (
                                    <button
                                        type='button'
                                        onClick={() => setShowServiceDetails(false)}
                                    >
                                        <img src={Icons.backBtn} alt='back-arrow' />
                                    </button>
                                )}
                            </div>
                            <div className='categories'>
                                <button
                                    type='button'
                                    onClick={() => setSelected('All')}
                                    className={`service-btn ${selected === 'All' ? 'active' : ''}`}
                                >
                                    All services
                                </button>
                                {services.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            type='button'
                                            onClick={() => handleCategoryButton(item.category)}
                                            className={`service-btn ${selected === item.category ? 'active' : ''}`}
                                        >
                                            {item.category}
                                        </button>
                                    )
                                })}
                            </div>
                            <div className='subCategories'>
                                <Box sx={{ width: '100%' }}>
                                    {selected !== 'All' && (
                                        <Box sx={{ borderBottom: 1, borderColor: '#B6B6B7' }}>
                                            <Tabs
                                                value={value}
                                                onChange={handleTabChange}
                                                TabIndicatorProps={{ className: 'indicator-border' }}
                                            >
                                                {subCategoriesByCategory.map((item, index) => {
                                                    return (
                                                        <Tab key={index} label={item} {...a11yProps(index)} />
                                                    )
                                                })}
                                            </Tabs>
                                        </Box>
                                    )}

                                    {selected !== 'All' && (
                                        subCategoriesByCategory.map((_, index) => {
                                            return (
                                                <TabPanel
                                                    key={index}
                                                    index={index}
                                                    value={value}
                                                >
                                                    {!showServiceDetails ? (
                                                        <List
                                                            loading={loading}
                                                            data={servicesBySubCategories}
                                                            setShowServiceDetails={setShowServiceDetails}
                                                        />
                                                    )
                                                        : <ServiceDetails
                                                            data={serviceDetails}
                                                            loading={serviceLoading}
                                                        />
                                                    }
                                                </TabPanel>
                                            )
                                        })
                                    )}

                                    {selected === 'All' && (
                                        !showServiceDetails ? (
                                            <List
                                                loading={loading}
                                                data={data.providerService ?? []}
                                                setShowServiceDetails={setShowServiceDetails}
                                            />
                                        ) : (
                                            <ServiceDetails
                                                data={serviceDetails}
                                                loading={serviceLoading}
                                            />
                                        )
                                    )}
                                </Box>
                            </div>
                        </StyledServices>
                    </React.Fragment>
                )}
            </StyledDetailContent>
        </LayoutContent >
    )
}

export default Index