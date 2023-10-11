import styled from "styled-components";
import { lightGrey, mainColor } from "styles/global";

export const StyledNotifications = styled.div`
    padding: 20px;
    margin: 20px 24px;
    border-radius: 6px;
    background: #2C2C2C;
    
    @media screen and (max-width: 700px) {
        padding: 12px;
        margin: 20px 12px;
    }

    .header {
        gap: 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

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
        }

        &_right {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .show-unread {
                .customLabel {
                    flex-direction: row-reverse;

                    .MuiFormControlLabel-label {
                        font-size: 12px;
                        font-weight: 400;
                        line-height: 18px;
                        font-style: normal;
                        color: ${lightGrey};
                        font-family: Poppins;

                        @media screen and (max-width: 520px) {
                            margin-left: 11px;
                        }
                    }
                }
            }

            .mark-asread {
                p {
                    gap: 4px;
                    display: flex;
                    color: #C2C2C3;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: 400;
                    line-height: 21px;
                    font-style: normal;
                    align-items: center;
                    font-family: Poppins;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }

    .list {
        margin-top: 32px;

        @media screen and (max-width: 520px) {
            margin-top: 12px;
        }

        &_item {
            padding-top: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #C2C2C3;

            .duration {
                color: #A1A1AA;
                font-size: 10px;
                font-weight: 400;
                line-height: 20px;
                font-style: normal;
                font-family: Poppins;       
                display: inline-block;
            }

            >div {
                gap: 15px;
                display: grid;
                align-items: center;
                grid-template-columns: auto 1fr;

                @media screen and (max-width: 520px) {
                    align-items: inherit;
                }

                .left {
                    .icon {
                        width: 32px;
                        height: 32px;
                        display: flex;
                        border-radius: 50%;
                        align-items: center;
                        background: #B6B6B7;
                        justify-content: center;
                    }
                }

                .text {
                    .title {
                        font-size: 12px;
                        font-weight: 400;
                        line-height: 20px;
                        font-style: normal;
                        color: ${lightGrey};
                        font-family: Poppins;
                    }
        
                    .message {
                        color: #C2C2C3;
                        font-size: 12px;
                        font-weight: 400;
                        line-height: 20px;
                        font-style: normal;
                        font-family: Poppins;

                        span {
                            color: ${mainColor};
                        }
                    }
                }
            }
        }
    }
`