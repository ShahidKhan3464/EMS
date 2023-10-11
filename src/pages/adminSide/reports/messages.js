import React, { useState } from 'react';
import moment from 'moment';
import { Icons } from 'assets';
import Dialog from '@mui/material/Dialog';
import { StyledAttachment } from './style';
import IconButton from '@mui/material/IconButton';

const Index = ({ createdBy, messages }) => {
    const [attachment, setAttachment] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const sortedMessages = [...messages].sort((a, b) => moment(a.createdAt).diff(moment(b.createdAt)))

    return (
        <React.Fragment>
            {dialogOpen && (
                <Dialog
                    fullScreen
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    PaperProps={{
                        style: {
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    }}
                >
                    <IconButton
                        onClick={() => setDialogOpen(false)}
                        sx={{
                            top: 16,
                            right: 16,
                            padding: 0,
                            position: 'absolute',
                        }}
                    >
                        <img src={Icons.popUpCross} alt='cross-icon' />
                    </IconButton>
                    <StyledAttachment>
                        <img src={attachment} alt="attachment" />
                    </StyledAttachment>
                </Dialog>
            )}
            <div className="messages">
                {sortedMessages.map((message) => {
                    const attachmentField = message?.attachments.length > 0
                    return (
                        <div
                            key={message.id}
                            className={`messageContainer ${message.createdBy === createdBy ? 'left' : 'right'}`}
                        >
                            <div className={`${attachmentField ? 'attachmentBox' : 'messageBox'}`}>
                                {attachmentField ? (
                                    <img
                                        alt='attachment'
                                        src={message?.attachments[0].attachment}
                                        onClick={() => {
                                            setDialogOpen(true)
                                            setAttachment(message?.attachments[0].attachment)
                                        }}
                                    />
                                ) : (
                                    <p className="messageText">{message.message}</p>
                                )}
                            </div>
                            <div className='user'>
                                <div className='avatar'>
                                    <img
                                        alt='avatar'
                                        src={message.createdBy === createdBy ? Icons.avatar2 : Icons.avatar}
                                    />
                                </div>
                                <div className='date'>
                                    <span>{moment(message.createdAt).format("h:mm A")}</span>
                                    <span>{moment(message.createdAt).format("Do MMM")}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default Index