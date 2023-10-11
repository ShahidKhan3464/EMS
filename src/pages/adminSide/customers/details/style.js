import styled from "styled-components";
import { mainColor } from "styles/global";

export const StyledFeedback = styled.div`
    padding-top: 24px;

    @media screen and (max-width: 700px) {
        padding-top: 12px;
    }

    .heading {
        color: #FDFDFD;
        font-size: 20px;
        font-weight: 500;
        line-height: 22px;
        font-style: normal;
        font-family: Poppins;

        @media screen and (max-width: 520px) {
            font-size: 18px;
        }
    }    

    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
            padding: 0;
            border: none;
            outline: none;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            font-style: normal;
            color: ${mainColor};
            font-family: Poppins;
            background: transparent;
            text-decoration: underline;
        }
    }

    >div {
        gap: 15px;
        display: grid;
        padding-top: 8px;
        align-items: center;
        grid-template-columns: 1fr 1fr 1fr;

        @media screen and (max-width: 700px) {
            grid-template-columns: 1fr 1fr;
        }

        @media screen and (max-width: 520px) {
            grid-template-columns: 1fr;
        }

        .box {
            padding: 10px;
            border-radius: 6px;
            background: #373737;
            box-shadow: 0px 0px 10px 0px rgba(52, 84, 207, 0.07);

            &_top {
                gap: 14px;
                display: flex;

                .reviews {
                    .stars {
                        gap: 5px;
                        display: flex;
                        padding-top: 5px;
                        align-items: center;
                    }            

                    span {
                        color: #FBFBFC;
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 24px;
                        font-style: normal;
                        font-family: Poppins;
                        letter-spacing: 0.32px;
                    }
                }
            }

            &_message {
                margin-top: 10px;

                p {
                    color: #B6B6B7;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 22px;
                    font-style: normal;
                    font-family: Poppins;
                    letter-spacing: 0.28px;
                }
            }
        }
    }
`

export const StyledBookedServices = styled.div`
    margin-top: 24px;

    @media screen and (max-width: 700px) {
        margin-top: 12px;
    }

    .services-content {
        padding: 20px;
        border-radius: 6px;
        background: #252525;
        box-shadow: 0px 0px 10px 0px rgba(52, 84, 207, 0.07);

        @media screen and (max-width: 700px) {
            padding: 12px;
        }

        &_heading {
            color: #FDFDFD;
            font-size: 20px;
            font-weight: 500;
            line-height: 22px;
            font-style: normal;
            font-family: Poppins;

            @media screen and (max-width: 520px) {
                font-size: 18px;
            }
        }

        &_list {
            gap: 12px;
            display: grid;
            padding-top: 16px;
            grid-template-columns: 1fr;

            &_item {
                display: flex;
                padding: 16px;
                cursor: pointer;
                border-radius: 6px;
                background: #353535;
                align-items: center;
                justify-content: space-between;
                box-shadow: 0px 0px 10px 0px rgba(52, 84, 207, 0.07);

                @media screen and (max-width: 700px) {
                   padding: 8px;
                }

                .left {
                    gap: 12px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;

                    .data {
                        .name {
                            color: #FDFDFD;
                            font-size: 16px;
                            font-weight: 500;
                            line-height: 22px;
                            font-style: normal;
                            font-family: Poppins;
                        }

                        div {
                            gap: 4px;
                            display: flex;
                            margin-top: 6px;
                            margin-bottom: 9px;
                            align-items: center;

                            span {
                                color: #C2C2C3;
                                font-size: 12px;
                                font-weight: 400;
                                line-height: 21px;
                                font-style: normal;
                                font-family: Poppins;
                            }
                        }

                        .price {
                            font-size: 16px;
                            font-weight: 500;
                            line-height: 22px;
                            font-style: normal;
                            color: ${mainColor};
                            font-family: Poppins;
                            letter-spacing: 0.32px;
                        }
                    }
                }

                .right {
                    height: 100%;
                    display: flex;
                    align-items: flex-end;

                    .rating {
                        gap: 6px;
                        display: flex;
                        align-items: center;

                        >div {
                            padding-bottom: 0px;
                        }

                        span {
                            color: #C2C2C3;
                            font-size: 12px;
                            font-weight: 400;
                            line-height: 17px;
                            font-style: normal;
                            font-family: Poppins;
                        }
                    }
                }
            }
        }
    }
`