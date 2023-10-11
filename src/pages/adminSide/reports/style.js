import styled from "styled-components";
import { lightGrey, mainColor, normalGrey } from "styles/global";

export const StyledReportContainer = styled.div`
    padding: 20px;
    margin: 20px 24px;
    border-radius: 6px;
    background: #2C2C2C;

    @media screen and (max-width: 700px) {
        padding: 12px;
        margin: 20px 12px;
    }

    .reports {
        >div {
            &::-webkit-scrollbar {
                width: 3px;
                height: 3px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background: ${normalGrey};
            }
        }

        &_content {
            padding-top: 20px;

            @media screen and (max-width: 520px) {
                padding-top: 0px;
            }
            
            &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }

            .stacks {
                gap: 12px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;

                .MuiChip-root {
                    height: 38px;
                    border: none;
                    width: 126px;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 22px;
                    font-style: normal;
                    border-radius: 4px;
                    font-family: Poppins;
                }
            }

            &_tabsPanel {
                width: 100%;

                .indicator-border {
                    background:  ${mainColor};
                }

                .MuiTabs-root {
                    min-height: 40px;

                    @media screen and (max-width: 520px) {
                        min-height: 35px;
                    }
                    
                    .MuiTabs-scroller {
                        overflow: auto !important;

                        .MuiTabs-flexContainer {
                            gap: 40px;

                            @media screen and (max-width: 520px) {
                                gap: 20px;
                            }  
    
                            .Mui-selected {
                                font-weight: 400;
                                color: ${mainColor};
                            }
                        
                            button {
                                padding: 0;
                                color: #B6B6B7;
                                font-size: 16px;
                                font-weight: 500;
                                min-height: 30px;
                                line-height: 19px;
                                font-style: normal;
                                font-family: Poppins;
                                text-transform: capitalize;

                                @media screen and (max-width: 520px) {
                                    font-size: 12px;
                                }   
                            }
                        }
                    }
                }
            }

            .add-btn {
                button {
                    border: none;
                    outline: none;
                    color: #F9FAFB;
                    font-size: 13px;
                    cursor: pointer;
                    font-weight: 500;
                    line-height: 18px;
                    font-style: normal;
                    border-radius: 6px;
                    padding: 10px 16px;
                    font-family: Poppins;
                    letter-spacing: -0.01px;
                    background: ${mainColor};
                }
            }
        }
    }
`

export const StyledReportList = styled.div`
    .reports {
        margin-top: 20px;
    
        .email {
            display: block;
            color: #C0C0C0;
            font-size: 12px;
            font-weight: 400;
            line-height: 85.5%;
            font-style: normal;
            font-family: Poppins;
        }
    }
`

export const StyledChatBox = styled.div`
    display: flex;
    padding: 15px;
    background: #323232;
    flex-direction: column;
    justify-content: space-between;
    min-height: calc(100vh - 265px);

    @media screen and (max-width: 520px) {
        padding: 10px;
    }   

    .chatBox {
        &_content {
            &_top {
                gap: 15px;
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;
                justify-content: space-between;

                @media screen and (max-width: 520px) {
                    justify-content: center;
                }   
    
                &_left {
                    gap: 10px;
                    display: flex;
                    align-items: center;

                    button {
                        padding: 0;
                        border: none;
                        outline: none;
                        cursor: pointer;
                        background: transparent;
                    }

                    &_profile {
                        gap: 10px;
                        display: flex;
                        align-items: center;
        
                        .avatar {
                            width: 36px;
                            height: 36px;

                            @media screen and (max-width: 520px) {
                                height: 30px;
                            }   
            
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                border-radius: 50%;
                            }
                        }
            
                        div:last-child {
                            gap: 11px;
                            display: flex;
                            flex-direction: column;
    
                            @media screen and (max-width: 520px) {
                                gap: 5px;
                            }
                            
                            .id-subject {
                                gap: 12px;
                                display: flex;
                                align-items: center;

                                .ticketId {
                                    font-size: 12px;
                                    font-weight: 400;
                                    line-height: 85.5%;
                                    font-style: normal;
                                    color: ${lightGrey};
                                    font-family: Poppins;

                                    span {
                                        color: #C2C2C3;
                                    }
                                }

                                .subject {
                                    font-size: 14px;
                                    font-weight: 400;
                                    line-height: 85.5%;
                                    font-style: normal;
                                    color: ${lightGrey};
                                    font-family: Poppins;
                                }
                            }
            
                            span {
                                color: #C2C2C3;
                                font-size: 12px;
                                font-weight: 400;
                                line-height: 85.5%;
                                font-style: normal;
                                font-family: Poppins;
    
                                @media screen and (max-width: 520px) {
                                    font-size: 10px;
                                }  
                            }
                        }
                    }
                }
            }

            &_request {
                padding-top: 25px;

                @media screen and (max-width: 520px) {
                    padding-top: 15px;
                }   

                .original-request {
                    display: grid;
                    align-items: center;
                    grid-template-columns: 1fr auto 1fr;
    
                    div:first-child, div:last-child {
                        height: 1px;
                        background: ${mainColor};
                    }
    
                    .text {
                        padding: 6px;
                        font-size: 12px;
                        font-weight: 400;
                        font-style: normal;
                        line-height: 78.8%;
                        color: ${lightGrey};
                        background: #232323;
                        border-radius: 19px;
                        font-family: Poppins;
                        border: 1px solid ${mainColor};
                    }
                }
    
                .description {
                    padding: 16px 0;
                    border-bottom: 1px solid ${mainColor};

                    @media screen and (max-width: 520px) {
                        padding-top: 8px;
                    } 

                    p {
                        color: #C2C2C3;
                        font-size: 14px;
                        font-weight: 400;
                        font-style: normal;
                        font-family: Poppins;

                        @media screen and (max-width: 520px) {
                            font-size: 12px;
                        }   
                    }
                }
            }
        }
        
        &_form {
            .field-wrapper {
                padding: 12px;
                display: grid;
                position: relative;
                border-radius: 4px;
                background: #424242;
                grid-template-columns: 1fr 1fr 1fr;
                filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.10));

                @media screen and (max-width: 520px) {
                    padding: 5px;
                }   

                .field-control {
                    .selected-file {
                        width: 100px;
                        border-radius: 5px;
                        position: relative;

                        &:hover span{
                            opacity: 1;
                        }

                        span {
                            right: 0;
                            top: -10px;
                            opacity: 0;
                            padding: 2px;
                            display: flex;
                            cursor: pointer;
                            position: absolute;
                            border-radius: 50%;
                            background: #232323;
                            transition: all 0.3s ease;
                            transition-property: opacity;

                            svg {
                                width: 16px;
                                fill: white;
                                height: 16px;
                            }
                        }

                        img {
                            width: 100%;
                            border-radius: 5px;
                            height: fit-content;
                        }
                    }

                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        outline: none;
                        color: #919292;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 19px;
                        font-style: normal;
                        font-family: Poppins;
                        background: transparent;

                        &::placeholder {
                            color: #919292;
                        }

                        @media screen and (max-width: 520px) {
                            font-size: 12px;
                        }  
                    }
                }

                .btn-container {
                    gap: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    @media screen and (max-width: 520px) {
                        gap: 10px;
                    }   
                
                    >div {
                        width: 2px;
                        height: 100%;
                        background: #B6B6B7;
                    }

                    button {
                        border: none;
                        outline: none;
                        color: #FFFFFF;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 500;
                        font-style: normal;
                        padding: 14px 45px;
                        border-radius: 10px;
                        line-height: 71.81%;
                        font-family: Poppins;
                        background: ${mainColor};

                        @media screen and (max-width: 520px) {
                            font-size: 11px;
                            padding: 11px 10px;
                            border-radius: 5px;
                        }   
                    }
                }
            }
        }
    }
`

export const StyledReports = styled.div`
    padding: 30px 0 10px;
    
    @media screen and (max-width: 520px) {
        padding: 20px 0 10px;
    }  

    .messages {
        gap: 35px;
        display: flex;
        overflow: auto;
        padding-right: 10px;
        flex-direction: column;
        height: calc(300px - 100px);

        @media screen and (max-width: 520px) {
            gap: 20px;
        }  

        &::-webkit-scrollbar {
            width: 3px;
            height: 3px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: rgb(235 230 230);
        }

        .right {
            justify-content: flex-end;

            .messageBox {
                background: #424242;
                border-radius: 10px 0 10px 10px;
            }
        }

        .left {
            justify-content: flex-end;
            flex-direction: row-reverse;

            .messageBox {
                background: #927133;
                border-radius: 0 10px 10px 10px;
            }
        }

        .messageContainer {
            gap: 15px;
            display: flex;
            align-items: flex-start;

            @media screen and (max-width: 520px) {
                gap: 10px;
            }   

            .attachmentBox {
                width: 180px;
                height: 150px;
                cursor: pointer;

                @media screen and (max-width: 520px) {
                    width: 125px;
                    height: 120px;
                } 

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                }
            }

            .messageBox {
                width: 100%;
                padding: 12px;
                max-width: 454px;

                @media screen and (max-width: 520px) {
                    padding: 6px;
                }  

                .messageText {
                    margin: 0;
                    font-size: 14px;
                    font-weight: 400;
                    font-style: normal;
                    color: ${lightGrey};
                    font-family: Poppins;

                    @media screen and (max-width: 520px) {
                        font-size: 12px;
                        line-height: 15px;
                    }  
                }
            }

            .user {
                gap: 10px;
                display: flex;
                flex-direction: column;

                @media screen and (max-width: 520px) {
                    gap: 5px;   
                }

                .avatar {
                    width: 43px;
                    height: 43px;

                    @media screen and (max-width: 520px) {
                        width: 30px;
                        height: 30px;    
                    } 

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }

                .date {
                    gap: 5px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;

                    span {
                        color: #BDBDBD;
                        font-size: 12px;
                        font-weight: 400;
                        font-style: normal;
                        text-align: center;
                        line-height: 85.5%;
                        font-family: SF Pro Text;

                        @media screen and (max-width: 520px) {
                            font-size: 10px;    
                        } 
                    }
                }
            }
        }
    }
`

export const StyledDropdownStatus = styled.div`
    .ant-select {
        .ant-select-selector {
            border: none;
            height: 25px;
            display: flex;
            outline: none;
            padding: 0 8px;
            align-items: center;
            box-shadow: none !important;
            background: rgba(67, 183, 80, 0.20);

            @media screen and (max-width: 520px) {
                height: 20px;
            } 

            .ant-select-selection-item {
                color: #22C55E;
                font-size: 14px;
                font-weight: 400;
                line-height: 17px;
                font-style: normal;
                font-family: Poppins;
                padding-inline-end: 25px;
                letter-spacing: -0.0045em;

                @media screen and (max-width: 520px) {
                    font-size: 12px;
                } 
            }
        }
    }
`

export const StyledAttachment = styled.div`
    width: 100%;
    margin: auto;
    display: flex;
    max-width: 700px;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 50px);

    @media screen and (max-width: 768px) {
        max-width: 500px;
    }

    @media screen and (max-width: 520px) {
        max-width: 400px;
    }

    @media screen and (max-width: 425px) {
        max-width: 300px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`