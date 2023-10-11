import React, { useEffect, useState } from 'react';
import { Icons } from 'assets';
import Profile from './profile';
import LayoutContent from 'layout';
import Dialog from 'components/dialog';
import FormDialog from 'components/formDialog';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CauseOfRejectionForm from '../causeOfRejectionForm';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledDetailContent, StyledLoadingContainer, StyledMainHeading } from 'styles/global';
import { serviceProviderApproval, serviceProviderDetails } from 'redux/serviceProviders/actions';

const Index = () => {
    const isDetailPage = true
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { loading, data } = useSelector((state) => state.serviceProvidersReducers.details)

    const rejectContent = () => {
        return (
            <React.Fragment>
                <div className='icon'>
                    <img src={Icons.reject} alt='reject-icon' />
                </div>

                <div className='text'>
                    <h3>Reject request</h3>
                    <p>Are you sure you want to reject this request?</p>
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
                        onClick={() => setDialogType('reason')}
                    >
                        Reject
                    </button>
                </div>
            </React.Fragment>
        )
    }

    useEffect(() => {
        dispatch(serviceProviderDetails(id))
    }, [id, dispatch])

    return (
        <LayoutContent>
            {dialogOpen && (dialogType === 'reject')
                ? (
                    <Dialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        content={rejectContent()}
                    />
                ) : dialogType === 'reason' && (
                    <FormDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        title="Add cause of rejection"
                        formContent={
                            <CauseOfRejectionForm
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
                        <StyledMainHeading>Service provider details</StyledMainHeading>
                    </div>
                    {!loading && (
                        <div className='btn-container'>
                            <button
                                type='button'
                                className='approval-btn'
                                onClick={async () => {
                                    const obj = { profileApprovedStatus: "APPROVED" }
                                    await dispatch(serviceProviderApproval(id, obj))
                                    navigate("/requests")
                                }}
                            >
                                Accept
                            </button>
                            <button
                                type='button'
                                className='reject-btn'
                                onClick={() => {
                                    setDialogOpen(true)
                                    setDialogType('reject')
                                }}
                            >
                                Reject
                            </button>
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
                            email={data.email}
                            profile={data.profile}
                            vatCer={data.companyProfile?.[0]?.vatCertificate}
                        />
                    </React.Fragment>
                )}
            </StyledDetailContent>
        </LayoutContent >
    )
}

export default Index