import React, { useState } from 'react';
import Faqs from './faqs';
import Support from './support';
import LayoutContent from 'layout';
import { payloadData } from 'utils';
import FaqsForm from './faqs/faqsForm';
import { useSelector } from 'react-redux';
import { StyledHelpContainer } from './style';
import FormDialog from 'components/formDialog';
import { StyledMainHeading } from 'styles/global';

const Index = () => {
    const [activeTab, setActiveTab] = useState(1)
    const [dialogType, setDialogType] = useState(null)
    const [payload, setPayload] = useState(payloadData)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { value } = useSelector((state) => state.helpReducers.faqsList)

    return (
        <React.Fragment>
            {dialogOpen && (
                <FormDialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    title={dialogType === 'add' ? 'Add new FAQ' : ''}
                    formContent={
                        <FaqsForm
                            value={value}
                            setPayload={setPayload}
                            dialogType={dialogType}
                            setOpen={setDialogOpen}
                        />
                    }
                />
            )}
            <LayoutContent>
                <StyledHelpContainer>
                    <div className='help'>
                        <div className='help_left-side'>
                            <div className='help_left-side_header'>
                                <StyledMainHeading>Help</StyledMainHeading>
                            </div>
                            <div className='help_left-side_tabs'>
                                <button
                                    type='button'
                                    onClick={() => setActiveTab(1)}
                                    className={activeTab === 1 ? 'activeTab' : ''}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3749 6.0625C10.6513 6.0625 10.0625 6.65125 10.0625 7.37491C10.0625 8.33541 11.0645 8.96878 11.9292 8.56406L11.6987 8.3335C11.5156 8.15047 11.5156 7.85366 11.6987 7.67059C11.8817 7.48756 12.1785 7.48756 12.3616 7.67059L12.5816 7.89056C12.9516 7.02816 12.3149 6.0625 11.3749 6.0625Z" fill="#C2C2C3" />
                                        <path d="M14.5937 2.20312H1.40625C0.630844 2.20312 0 2.83397 0 3.60938V11.1408C0 11.9163 0.630844 12.5471 1.40625 12.5471H6.82812L7.625 13.6095C7.81256 13.8596 8.18784 13.8591 8.375 13.6095L9.17188 12.5471H14.5937C15.3692 12.5471 16 11.9163 16 11.1408V3.60938C16 2.83397 15.3691 2.20312 14.5937 2.20312ZM4.14959 6.88587C4.40847 6.88587 4.61834 7.09575 4.61834 7.35462C4.61834 7.6135 4.40847 7.82337 4.14959 7.82337H3.29894V9.15619C3.29894 9.41506 3.08903 9.62494 2.83019 9.62494C2.57131 9.62494 2.36144 9.41506 2.36144 9.15619V5.62C2.36144 5.36113 2.57131 5.15125 2.83019 5.15125H4.26341C4.52228 5.15125 4.73216 5.36113 4.73216 5.62C4.73216 5.87888 4.52228 6.08875 4.26341 6.08875H3.29894V6.88587H4.14959ZM8.36872 9.59475C8.12644 9.68622 7.85606 9.56384 7.76466 9.32169L7.54897 8.75022H6.04697L5.82878 9.32306C5.73647 9.56538 5.46531 9.68625 5.22391 9.59425C4.982 9.50213 4.86056 9.23131 4.95269 8.98934L6.29031 5.47722C6.36672 5.27388 6.56644 5.12538 6.80259 5.12513C6.91165 5.12475 7.01834 5.15696 7.10897 5.21762C7.1996 5.27828 7.27005 5.36463 7.31128 5.46559C7.31581 5.47662 7.25641 5.31956 8.64181 8.99069C8.73319 9.23287 8.61091 9.50338 8.36872 9.59475ZM13.5014 9.47328C13.3183 9.65634 13.0215 9.65634 12.8385 9.47328L12.6158 9.25063C12.2599 9.48688 11.8333 9.62494 11.375 9.62494C10.1344 9.62494 9.12516 8.61566 9.12516 7.37506C9.12516 6.13447 10.1344 5.12516 11.375 5.12516C12.6156 5.12516 13.6249 6.13447 13.6249 7.37506C13.6249 7.81881 13.4953 8.23263 13.2726 8.58156L13.5014 8.81034C13.6844 8.99341 13.6844 9.29022 13.5014 9.47328Z" fill="#C2C2C3" />
                                        <path d="M6.4043 7.81303H7.19548L6.8017 6.76953L6.4043 7.81303Z" fill="#C2C2C3" />
                                    </svg>
                                    <span>FAQ's</span>
                                </button>

                                <button
                                    type='button'
                                    onClick={() => setActiveTab(2)}
                                    className={activeTab === 2 ? 'activeTab' : ''}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_1972_6353)">
                                            <path d="M16.0002 10.8284C16.0002 8.84289 14.8612 7.07092 13.1552 6.20898C13.1023 10.0159 10.0159 13.1023 6.20898 13.1552C7.07092 14.8612 8.84289 16.0002 10.8284 16.0002C11.7593 16.0002 12.6645 15.7523 13.4599 15.2812L15.9776 15.9776L15.2812 13.46C15.7523 12.6645 16.0002 11.7593 16.0002 10.8284Z" fill="#C2C2C3" />
                                            <path d="M12.2188 6.10938C12.2188 2.74062 9.47812 0 6.10938 0C2.74062 0 0 2.74062 0 6.10938C0 7.20728 0.29225 8.27625 0.847188 9.21472L0.0224375 12.1962L3.004 11.3716C3.9425 11.9265 5.01147 12.2188 6.10938 12.2188C9.47812 12.2188 12.2188 9.47812 12.2188 6.10938ZM5.17188 4.6875H4.23438C4.23438 3.65356 5.07544 2.8125 6.10938 2.8125C7.14331 2.8125 7.98438 3.65356 7.98438 4.6875C7.98438 5.21228 7.76219 5.71669 7.37463 6.07116L6.57812 6.80016V7.53125H5.64062V6.38734L6.74169 5.37953C6.93847 5.19947 7.04688 4.95375 7.04688 4.6875C7.04688 4.17053 6.62634 3.75 6.10938 3.75C5.59241 3.75 5.17188 4.17053 5.17188 4.6875ZM5.64062 8.46875H6.57812V9.40625H5.64062V8.46875Z" fill="#C2C2C3" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1972_6353">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span>Support</span>
                                </button>
                            </div>
                        </div>

                        <div className='help_content'>
                            <div className='help_content_tabsPanel'>
                                {activeTab === 1 && <Faqs payload={payload} setPayload={setPayload} />}
                                {activeTab === 2 && <Support />}
                            </div>
                            {activeTab === 1 && (
                                <div className='add-btn'>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            setDialogOpen(true)
                                            setDialogType('add')
                                        }}
                                    >
                                        Add
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </StyledHelpContainer>
            </LayoutContent>
        </React.Fragment>
    )
}

export default Index