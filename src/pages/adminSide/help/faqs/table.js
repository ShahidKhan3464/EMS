import React, { useState } from 'react';
import { Icons } from 'assets';
import FaqsForm from './faqsForm';
import Dialog from 'components/dialog';
import { useDispatch } from 'react-redux';
import { StyledFaqsList } from '../style';
import MenuList from 'components/menuList';
import Pagination from 'components/pagination';
import FormDialog from 'components/formDialog';
import { deleteFaq } from 'redux/help/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledLoadingContainer, StyledNoResultsFound } from 'styles/global';

const options = [
    { value: 'edit', text: 'Edit' },
    { value: 'delete', text: 'Delete' },
]

const Index = ({ faqs, value, payload, loading, totalRecords, setPayload }) => {
    const dispatch = useDispatch()
    const [id, setId] = useState(null)
    const noResultsFound = totalRecords === 0
    const [activeItem, setActiveItem] = useState(null)
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleLoading, setDeleLoading] = useState(false)

    const toggleAccordion = (id) => {
        setActiveItem((prevActiveItem) => (prevActiveItem === id ? null : id))
    }

    const deleteContent = () => {
        return (
            <React.Fragment>
                <div className='icon'>
                    <img src={Icons.deleteFaq} alt='delete-faq' />
                </div>

                <div className='text'>
                    <h3>Delete</h3>
                    <p>Are you sure you want to delete this FAQ?</p>
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
                        onClick={() => handleDeleteFaq(id)}
                    >
                        {deleLoading ? (
                            <CircularProgress
                                size={22}
                                color='inherit'
                            />
                        ) : (
                            "Delete"
                        )}
                    </button>
                </div>
            </React.Fragment>
        )
    }

    const handleChangePage = (event, newPage) => {
        setPayload(prevData => ({
            ...prevData,
            page: newPage,
        }))
    }

    const handleChangeRowsPerPage = (e) => {
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: parseInt(e.target.value, 10)
        }))
    }

    const handleDeleteFaq = async (id) => {
        setDeleLoading(true)
        await dispatch(deleteFaq(id))
        setPayload(prevData => ({ ...prevData }))
        setDialogOpen(false)
        setDeleLoading(false)
    }

    const handleTableMenu = (id, option) => {
        if (option === 'edit') {
            setId(id)
            setDialogOpen(true)
            setDialogType(option)
        }

        else if (option === 'delete') {
            setId(id)
            setDialogOpen(true)
            setDialogType(option)
        }
    }

    return (
        <React.Fragment>
            {dialogOpen && (dialogType === 'delete')
                ? (
                    <Dialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        content={deleteContent()}
                    />
                )
                : dialogType === 'edit' && (
                    <FormDialog
                        open={dialogOpen}
                        title={'Edit FAQ'}
                        setOpen={setDialogOpen}
                        formContent={
                            <FaqsForm
                                id={id}
                                faqs={faqs}
                                value={value}
                                dialogType={dialogType}
                                setPayload={setPayload}
                                setOpen={setDialogOpen}
                            />
                        }
                    />
                )
            }
            <StyledFaqsList activeItem={activeItem}>
                {loading ? (
                    <div className='loader'>
                        <StyledLoadingContainer>
                            <CircularProgress />
                        </StyledLoadingContainer>
                    </div>
                ) : noResultsFound ? (
                    <div className='no-result-found'>
                        <StyledNoResultsFound>
                            <div className='box'>
                                <img src={Icons.notFound} alt='no-result-found' />
                                <h3>No FAQs found</h3>
                            </div>
                        </StyledNoResultsFound>
                    </div>
                ) : (
                    faqs?.map((faq) => {
                        return (
                            <div
                                key={faq.id}
                                className={`accordion ${activeItem === faq.id ? 'active' : ''}`}
                            >
                                <div
                                    className='accordion_question'
                                    onClick={() => toggleAccordion(faq.id)}
                                >
                                    <h3>{faq.topic}</h3>
                                    <div className='btns'>
                                        <button>
                                            <img src={Icons.rightArrow} alt='right-arrow' />
                                        </button>
                                        <MenuList
                                            id={faq.id}
                                            options={options}
                                            handleTableMenu={handleTableMenu}
                                        />
                                    </div>
                                </div>
                                <div className="accordion_answer">
                                    <p>{faq.description}</p>
                                </div>
                            </div>
                        )
                    }))}
            </StyledFaqsList>
            {!noResultsFound && !loading && (
                <Pagination
                    page={payload.page}
                    count={totalRecords}
                    rowsPerPage={payload.pageSize}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </React.Fragment>
    )
}

export default Index