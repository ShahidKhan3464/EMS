import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'antd';
import { Formik } from 'formik';
import { getToken } from 'utils';
import Dialog from 'components/dialog';
import { StyledGeneral } from './style';
import { mainColor } from 'styles/global';
import EmailContent from './emailContent';
import SweetAlert from 'components/sweetAlert';
import PasswordContent from './passwordContent';
import TextField from '@mui/material/TextField';
import { useMediaQuery } from 'react-responsive';
import ImageUploading from 'react-images-uploading';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { fileUpload, viewProfile } from 'redux/profile/actions';
const baseURL = 'https://devbackend.art-event.eu';

const Index = () => {
  const authToken = getToken()
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 490 })
  const [dialogType, setDialogType] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [fileApiHitted, setFileApiHitted] = useState(false)
  const { data } = useSelector((state) => state.authReducers.adminSignIn)
  const { message } = useSelector((state) => state.profileReducers.fileUpload)
  const { filePath } = useSelector((state) => state.profileReducers.viewProfile)
  const { email } = data

  const passwordContent = () => {
    return (
      <React.Fragment>
        <div className='text'>
          <h3>Update email</h3>
          <p>To change your email, enter your current password</p>
        </div>
        <PasswordContent
          setDialogOpen={setDialogOpen}
          setDialogType={setDialogType}
        />
      </React.Fragment>
    )
  }

  const emailContent = () => {
    return (
      <React.Fragment>
        <div className='text'>
          <h3>Update email</h3>
          <p
            style={{
              padding: '0 90px',
              ...(isMobile && {
                padding: '0',
              }),
            }}
          >
            Enter your new email
          </p>
        </div>
        <EmailContent setDialogOpen={setDialogOpen} />
      </React.Fragment>
    )
  }

  const handleSubmit = async () => {
    const file = image[0].file
    const formData = new FormData()
    formData.append('files', file)

    try {
      setLoading(true)
      const response = await axios.post(`${baseURL}/file-upload`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.Succeeded) {
        const urlString = response.data.data[0]
        const obj = { logo: urlString }
        await dispatch(fileUpload(obj))
        await dispatch(viewProfile())
        setFileApiHitted(true)
        setLoading(false)
        return
      }

      setLoading(false)
      SweetAlert('error', 'Warning!', response.data.message)
    } catch (error) {
      setLoading(true)
      SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (fileApiHitted) {
      if (message === 'Successful') {
        setImage(null)
        return
      }
    }
  }, [fileApiHitted, message])

  useEffect(() => {
    dispatch(viewProfile())
  }, [dispatch])

  return (
    <StyledGeneral>
      {dialogOpen && (
        <Dialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          content={
            dialogType === 'password'
              ? passwordContent()
              : dialogType === 'email' && emailContent()
          }
        />
      )}
      <Formik
        initialValues={{ '': '' }}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form
              noValidate
              name='basic'
              autoComplete='off'
              onFinish={formik.handleSubmit}
            >
              <div className='field-control'>
                <ImageUploading
                  value={image}
                  dataURLKey='data_url'
                  acceptType={['png', 'jpg']}
                  onChange={(imageList) => setImage(imageList)}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                  }) => (
                    <div className='upload__image-wrapper'>
                      {imageList.length === 0 && (
                        <button type='button' onClick={onImageUpload}>
                          Upload logo
                        </button>
                      )}
                      {imageList.length === 0 ? (
                        <div
                          className={
                            filePath ? 'image-item' : 'upload-image'
                          }
                        >
                          {filePath ? (
                            <div className='image-shown'>
                              <img
                                src={filePath}
                                alt='logo'
                                width='100'
                              />
                            </div>
                          ) : (
                            <span>Logo</span>
                          )}
                        </div>
                      ) : (
                        imageList?.map((image, index) => (
                          <div key={index} className='image-item'>
                            <div className='image-shown'>
                              <img
                                src={image.data_url}
                                alt='logo'
                                width='100'
                              />
                            </div>
                            <div className='image-item__btn-wrapper'>
                              <button
                                type='button'
                                onClick={() => onImageUpdate(index)}
                              >
                                Change photo
                              </button>
                              <button
                                type='button'
                                onClick={() => onImageRemove(index)}
                              >
                                Remove photo
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </ImageUploading>
              </div>

              <div className='disabled-field'>
                <TextField
                  disabled
                  fullWidth
                  label='Email'
                  value={email || ''}
                  sx={{
                    '& .Mui-disabled': {
                      fontWeight: 400,
                      fontStyle: 'normal',
                      cursor: 'not-allowed',
                      fontFamily: 'Poppins',
                      color: '#B6B6B7 !important',
                    },
                    '& .MuiOutlinedInput-input': {
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontStyle: 'normal',
                      fontFamily: 'Poppins',
                      letterSpacing: '0.5px',
                      WebkitTextFillColor: '#B6B6B7 !important',
                      '@media screen and (max-width: 520px)': {
                        fontSize: '14px',
                      },
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderRadius: '8px',
                        border: '1.5px solid #79747E !important',
                      },

                      '& fieldset legend': {
                        width: '7%',
                      },
                    },
                  }}
                />

                <button
                  type='button'
                  className='update-email-btn'
                  onClick={() => {
                    setDialogOpen(true)
                    setDialogType('password')
                  }}
                >
                  Update email
                </button>
              </div>

              <div className='btn-container'>
                <button type='button' className='cancel-btn'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='save-btn'
                  disabled={!image || !image.length}
                  style={{
                    width: '125px',
                    color: !image || !image.length ? '#919292' : '#F9FAFB',
                    cursor: !image || !image.length ? 'not-allowed' : 'pointer',
                    background: !image || !image.length ? '#4C4C4C' : mainColor,
                  }}
                >
                  {loading ? (
                    <CircularProgress size={22} color='inherit' />
                  ) : (
                    <span>Save changes</span>
                  )}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </StyledGeneral>
  )
}

export default Index