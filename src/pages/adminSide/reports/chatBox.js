import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from "yup";
import { Form } from "antd";
import moment from 'moment';
import { Select } from 'antd';
import { useRef } from 'react';
import { Icons } from 'assets';
import Messages from './messages';
import SweetAlert from 'components/sweetAlert';
import ClearIcon from '@mui/icons-material/Clear';
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { FieldErrorMessage, StyledStatus } from 'styles/global';
import { replyReport, closeReport } from 'redux/reports/actions';
import { capitalizeFirstLetter, getToken, statusColors } from 'utils';
import { StyledChatBox, StyledDropdownStatus, StyledReports } from './style';
import { CLOSE_REPORT_RESET, REPLY_REPORT_RESET } from 'redux/reports/types';
const baseURL = 'https://devbackend.art-event.eu';

const Index = ({ reportData, setIsChatOpen, setPayload }) => {
    const authToken = getToken()
    const dispatch = useDispatch()
    const fileInputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [previewURL, setPreviewURL] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [closeApiHitted, setCloseApiHitted] = useState(false)
    const [replyApiHitted, setReplyApiHitted] = useState(false)
    const [messages, setMessages] = useState(reportData.messages)
    const [reportStatus, setReportStatus] = useState(reportData.queryStatus)
    const createdReportDate = moment(reportData.createdAt).format('DD MMM YYYY')
    const { data: closeReportData } = useSelector((state) => state.reportsReducers.closeReport)
    const { loading: replyLoading, data: replyReportData } = useSelector((state) => state.reportsReducers.replyReport)
    const lastReply = reportData.messages.length === 0
        ? moment(reportData.createdAt).fromNow()
        : moment(reportData.messages[reportData.messages.length - 1]?.createdAt).fromNow()
    const { firstName, lastName } = reportData.user.profile
    const name = `${firstName} ${lastName}`

    const indicatorStatusOfPendingAndClosed = (status) => {
        return (
            <StyledStatus
                color={statusColors[status].color}
                bg={statusColors[status].background}
            >
                {capitalizeFirstLetter(status)}
            </StyledStatus>
        )
    }

    const inProgressStatusIndicator = (status) => {
        return (
            <StyledDropdownStatus>
                <Select
                    defaultValue={status}
                    onChange={handleCloseReport}
                    suffixIcon={
                        <img
                            alt='down-arrow'
                            src={Icons.downArrow}
                            style={{ height: '8px' }}
                        />
                    }
                >
                    <Select.Option value="closed">
                        Closed
                    </Select.Option>
                </Select>
            </StyledDropdownStatus>
        )
    }

    const goBackToReportsList = () => {
        setIsChatOpen(false)
        dispatch({ type: CLOSE_REPORT_RESET })
        dispatch({ type: REPLY_REPORT_RESET })
        setPayload(prevData => ({
            ...prevData,
            page: 1,
            pageSize: 5
        }))
    }

    const handleCloseReport = async () => {
        await dispatch(closeReport(reportData.id))
        setCloseApiHitted(true)
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        const filePath = URL.createObjectURL(file)
        setSelectedFile(file)
        setPreviewURL(filePath)
    }

    const handleRemoveFile = () => {
        setPreviewURL(null)
        setSelectedFile(null)
        fileInputRef.current.value = null
    }

    const handleSubmit = async (data, { resetForm }) => {
        resetForm()
        data.attachments = []
        data.queryId = reportData.id
        const formData = new FormData()
        data.receiverId = reportData.createdBy
        if (selectedFile) {
            formData.append('files', selectedFile)
            try {
                setLoading(true)
                const response = await axios.post(`${baseURL}/file-upload`, formData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'multipart/form-data',
                    }
                })

                if (response.data.Succeeded) {
                    const urlString = response.data.data[0]
                    data.attachments = [{ "attachment": urlString }]
                    await dispatch(replyReport(reportData.createdBy, data))
                    setReplyApiHitted(true)
                    handleRemoveFile()
                    setLoading(false)
                    return
                }

                setLoading(false)
                SweetAlert('error', 'Warning!', response.data.message)
            }
            catch (error) {
                setLoading(true)
                SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
                setLoading(false)
            }
            return
        }
        await dispatch(replyReport(reportData.createdBy, data))
        setReplyApiHitted(true)
    }

    useEffect(() => {
        if (closeApiHitted) {
            setReportStatus(closeReportData.queryStatus)
            setCloseApiHitted(false)
        }
        else if (replyApiHitted) {
            setMessages(replyReportData.messages ?? messages)
            setReportStatus(replyReportData.queryStatus ?? reportStatus)
            setReplyApiHitted(false)
        }
    }, [closeApiHitted, replyApiHitted])

    return (
        <StyledChatBox>
            <div className='chatBox_content'>
                <div className='chatBox_content_top'>
                    <div className='chatBox_content_top_left'>
                        <button
                            type='button'
                            onClick={goBackToReportsList}
                        >
                            <img src={Icons.leftArrow} alt='left-arrow' />
                        </button>
                        <div className='chatBox_content_top_left_profile'>
                            <div className='avatar'>
                                <img src={Icons.avatar4} alt='avatar' />
                            </div>
                            <div>
                                <div className='id-subject'>
                                    <p className='ticketId'>Ticket id: <span>#{reportData.uniqueId}</span></p>
                                    <h3 className='subject'>{reportData.subject}</h3>
                                </div>
                                <span>
                                    {name} | {createdReportDate} Last Reply: {lastReply}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='chatBox_content_top_status'>
                        {reportStatus === 'PENDING' || reportStatus === 'CLOSED'
                            ? indicatorStatusOfPendingAndClosed(reportStatus)
                            : reportStatus === 'IN_PROGRESS' && inProgressStatusIndicator('In_progress')
                        }
                    </div>
                </div>

                <div className='chatBox_content_request'>
                    <div className='original-request'>
                        <div></div>
                        <div className='text'>Original request</div>
                        <div></div>
                    </div>
                    <div className='description'>
                        <p>
                            {reportData.description}
                        </p>
                    </div>
                </div>

                <StyledReports>
                    <Messages
                        messages={messages}
                        createdBy={reportData.createdBy}
                    />
                </StyledReports>
            </div>

            <div className='chatBox_form'>
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={{ message: "" }}
                    validationSchema={!selectedFile && validationSchema}
                >
                    {(formik) => {
                        return (
                            <Form
                                noValidate
                                name='basic'
                                autoComplete='off'
                                onFinish={formik.handleSubmit}
                            >
                                <div className='field-wrapper'>
                                    <div className='field-control'>
                                        {!previewURL ? (
                                            <Field name="message">
                                                {({ field }) => (
                                                    <React.Fragment>
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            name='message'
                                                            placeholder="Please answer..."
                                                        />
                                                        <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                    </React.Fragment>
                                                )}
                                            </Field>
                                        ) : (
                                            <div className='selected-file'>
                                                <span
                                                    onClick={handleRemoveFile}
                                                >
                                                    <ClearIcon />
                                                </span>
                                                <img src={previewURL} alt='file' />
                                            </div>
                                        )}
                                    </div>

                                    <div className='field-control'>
                                        <input
                                            type="file"
                                            name='file'
                                            id="file-input"
                                            key={selectedFile}
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                            onChange={e => handleFileUpload(e)}
                                        />
                                    </div>

                                    <div className='btn-container'>
                                        <span
                                            style={{ height: '24px', cursor: 'pointer' }}
                                            onClick={() => document.getElementById('file-input').click()}
                                        >
                                            <img src={Icons.attachment} alt='attachment' />
                                        </span>
                                        <div></div>
                                        <button
                                            type='submit'
                                            className='reply-btn'
                                            disabled={!selectedFile && !formik.isValid}
                                            style={{
                                                ...(!selectedFile && !formik.isValid && {
                                                    color: '#919292',
                                                    cursor: 'not-allowed',
                                                    background: '#4C4C4C',
                                                })
                                            }}
                                        >
                                            {replyLoading || loading ? (
                                                <CircularProgress
                                                    size={22}
                                                    color='inherit'
                                                />
                                            ) : (
                                                "Reply"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </StyledChatBox>
    )
}

export default Index
const validationSchema = Yup.object({
    message: Yup.string().required('This field is required')
});