import React, { useEffect, useState } from 'react';
import { Icons } from 'assets';
import Profile from './profile';
import Feedback from './feedback';
import LayoutContent from 'layout';
import Dialog from 'components/dialog';
import { useParams } from 'react-router-dom';
import BookedServices from './bookedServices';
import FormDialog from 'components/formDialog';
import { useDispatch, useSelector } from 'react-redux';
import ReasonOfBlockingForm from '../reasonOfBlockingForm';
import CircularProgress from '@mui/material/CircularProgress';
import { customerBlockUnBlock, customerDetails } from 'redux/customers/actions';
import { StyledDetailContent, StyledLoadingContainer, StyledMainHeading } from 'styles/global';

const Index = () => {
    const isDetailPage = true
    const { id } = useParams()
    const dispatch = useDispatch()
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { loading, data } = useSelector((state) => state.customersReducers.details)
    const { loading: statusLoading } = useSelector((state) => state.customersReducers.blockUnblock)

    const blockUnblockContent = () => {
        return (
            <React.Fragment>
                <div className='icon'>
                    <img src={Icons.customer} alt='customer-icon' />
                </div>

                <div className='text'>
                    <h3>
                        {dialogType === 'block' ? 'Block' : dialogType === 'unblock' && 'Unblock'}
                    </h3>
                    <p>
                        Are you sure you want to {dialogType === 'block' ? 'block' : dialogType === 'unblock' && 'unblock'} this customer?
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
                            await dispatch(customerBlockUnBlock(id, obj))
                            dispatch(customerDetails(id))
                            setDialogOpen(false)
                        }}
                    >
                        {statusLoading ? (
                            <CircularProgress
                                size={22}
                                color='inherit'
                            />
                        ) : (
                            dialogType === 'block' ? 'Block' : dialogType === 'unblock' && 'Unblock'
                        )}
                    </button>
                </div>
            </React.Fragment>
        )
    }

    useEffect(() => {
        dispatch(customerDetails(id))
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
                        <StyledMainHeading>Customer details</StyledMainHeading>
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
                                        setDialogOpen(true)
                                        setDialogType('block')
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
                            email={data?.email}
                            data={data?.profile}
                            rating={data?.rating}
                            totalEvents={data?.event?.length}
                            totalReviews={data?.sentFeedbackReceiver?.length}
                        />
                        <Feedback
                            data={data.sentFeedbackReceiver ?? []}
                        />
                        <BookedServices
                            id={id}
                            booking={data.booking ?? []}
                        />
                    </React.Fragment>
                )}
            </StyledDetailContent>
        </LayoutContent>
    )
}

export default Index