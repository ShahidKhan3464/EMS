import styled from "styled-components";
import { lightGrey, mainColor, normalGrey } from "styles/global";

export const StyledServices = styled.div`
    padding-top: 32px;
    
    @media screen and (max-width: 520px) {
        padding-top: 12px;
    }  

    .title {
        gap: 10px;
        display: flex;
        margin-bottom: 16px;
        justify-content: flex-end;
        flex-direction: row-reverse;

        h3 {
            color: #FDFDFD;
            font-size: 22px;
            font-weight: 500;
            line-height: 24px;
            font-style: normal;
            font-family: Poppins;

            @media screen and (max-width: 520px) {
                font-size: 18px;
            }  
        }

        button {
            padding: 0;
            border: none;
            outline: none;
            cursor: pointer;
            background: transparent;
        }
    }

    .categories {
        gap: 7px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .service-btn {
            width: 126px;
            height: 38px;
            border: none;
            outline: none;
            color: #FDFDFD;
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
            font-style: normal;
            border-radius: 4px;
            background: #6D6D6E;
            font-family: Poppins;
            box-shadow: 0px 0px 10px 0px rgba(52, 84, 207, 0.07);
        }

        .active {
            color: #FFFFFF;
            background: ${mainColor};
        }
    }

    .subCategories {
        margin-top: 24px;

        @media screen and (max-width: 520px) {
            margin-top: 20px;
        }  

        .indicator-border {
            background:  ${mainColor};
        }

        .MuiTabs-scroller {
            overflow: auto !important;

            .MuiTabs-flexContainer {
                gap: 20px;

                @media screen and (max-width: 520px) {
                    gap: 10;
                }  

                .Mui-selected {
                    font-weight: 400;
                    color: ${mainColor};
                }

                button {
                    padding: 0;
                    color: #B6B6B7;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 22px;
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
`

export const StyledServiceDetails = styled.div`

    .details-content {
        .heading {
            color: #FDFDFD;
            font-size: 20px;
            font-weight: 500;
            line-height: 22px;
            font-style: normal;
            font-family: Poppins;

            @media screen and (max-width: 520px) {
                font-size: 16px;
            }
        }

        .active {
            .showReason-icon {
                transform: rotate(180deg) !important;
            }

            div:last-child {
                padding-top: 6px;
                max-height: 200px;
            }
        }

        &_top {
            gap: 10px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;

            >div {
                gap: 24px;
                display: flex;
                align-items: center;

                h2 {
                    span {
                        font-size: 14px;
                        margin-left: 6px;
                        font-weight: 500;
                        line-height: 27px;
                        font-style: normal;
                        color: ${normalGrey};
                        font-family: Poppins;

                        @media screen and (max-width: 520px) {
                            font-size: 11px;
                        }
                    }
                }

                .status {
                    padding: 4px 12px;

                    @media screen and (max-width: 520px) {
                        padding: 3px 8px;
                    }
                }
            }

            .rating {
                gap: 6px;
                display: flex;
                align-items: center;

                >div {
                    padding-bottom: 0px;
                }

                span {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 18px;
                    font-style: normal;
                    color: ${normalGrey};
                    font-family: Poppins;
                }
            }
        }

        &_location {
            gap: 10px;
            display: flex;
            flex-wrap: wrap;
            padding-top: 24px;
            align-items: center;
            justify-content: space-between;

            @media screen and (max-width: 700px) {
                padding-top: 12px;
            }  

            >div {
                gap: 10px;
                display: flex;
                align-items: center;

                @media screen and (max-width: 520px) {
                    gap: 5px;
                }

                span {
                    color: #FFF;
                    font-size: 15px;
                    font-weight: 400;
                    line-height: 21px;
                    font-style: normal;
                    font-family: Poppins;

                    @media screen and (max-width: 520px) {
                        font-size: 11px;
                    }
                }

                h2 {
                    display: flex;
                    font-size: 32px;
                    font-weight: 500;
                    line-height: 21px;
                    font-style: normal;
                    align-items: center;
                    color: ${mainColor};
                    font-family: Poppins;
                    
                    @media screen and (max-width: 520px) {
                        font-size: 28px;
                    }

                    span {
                        color: #DADBDC;
                        font-size: 14px;
                        font-weight: 500;
                        margin-left: 8px;
                        line-height: 18px;
                        font-style: normal;
                        font-family: Poppins;

                        @media screen and (max-width: 520px) {
                            font-size: 12px;
                        }
                    }
                }
            }
        }

        &_pricePerHour {
            gap: 5px;
            display: flex;
            padding-top: 24px;
            align-items: center;
            justify-content: flex-end;

            @media screen and (max-width: 700px) {
                padding-top: 12px;
            }  

            p {
                color: #FDFDFD;
                font-size: 18px;
                font-weight: 500;
                line-height: 18px;
                font-style: normal;
                font-family: Poppins;

                @media screen and (max-width: 520px) {
                    font-size: 16px;
                }
            }

            >div {
                span {
                    font-weight: 500;
                    line-height: 18px;
                    font-style: normal;
                    color: ${mainColor};
                    font-family: Poppins;
                }

                .hour {
                    font-size: 16px;

                    @media screen and (max-width: 520px) {
                       font-size: 14px;
                    }
                }

                .total {
                    font-size: 24px;

                    @media screen and (max-width: 520px) {
                        font-size: 22px;
                    }
                }
            }
        }

        &_advancePayment {
            padding: 16px;
            margin-top: 24px;
            border-radius: 4px;
            background: #373737;

            @media screen and (max-width: 700px) {
                padding: 8px;
                margin-top: 16px;
            }

            p {
                font-size: 16px;
                font-weight: 400;
                font-style: normal;
                color: ${mainColor};
                line-height: normal;
                font-family: Poppins;
                letter-spacing: -0.072px;

                @media screen and (max-width: 520px) {
                    font-size: 14px;
                }
            }

            &_top {
                display: flex;
                cursor: pointer;
                justify-content: space-between;

                .showReason-icon {
                    transform: rotate(0deg);
                    transition: all .2s ease;
                }
            }

            &_reason {
                max-height: 0;
                overflow: hidden;
                transition: all .2s ease;
                transition-property: max-height, padding-top;

                p {
                    font-weight: 500;
                    color: ${lightGrey};

                    span {
                        font-weight: 400;
                        color: ${mainColor};
                    }
                }
            }
        }

        &_description {
            padding-top: 32px;

            @media screen and (max-width: 700px) {
                padding-top: 12px;
            }

            p {
                color: #FFF;
                font-size: 16px;
                font-weight: 300;
                padding-top: 12px;
                line-height: 27px;
                font-style: normal;
                font-family: Poppins;

                @media screen and (max-width: 520px) {
                    padding-top: 0;
                    font-size: 14px;
                }
            }
        }

        &_features {
            padding-top: 24px;

            @media screen and (max-width: 700px) {
                padding-top: 12px;
            }
           
            ul {
                margin-top: 10px;
                margin-bottom: 0;
                padding-left: 25px;

                li {
                    color: #FFF;
                    font-size: 16px;
                    font-weight: 300;
                    line-height: 21px;
                    font-style: normal;
                    padding-bottom: 6px;
                    font-family: Poppins;

                    @media screen and (max-width: 520px) {
                        font-size: 14px;
                    }
                }
            }
        }

        &_photos, &_videos {
            padding-top: 18px;

            @media screen and (max-width: 700px) {
                padding-top: 12px;
            }

            .services-images, .services-videos {
                gap: 20px;
                display: flex;
                flex-wrap: wrap;
                padding-top: 12px;
                align-items: center;

                img {
                    width: 120px;
                    height: 120px;
                    object-fit: cover;
                }
            }

            ol {
                margin-top: 20px;
                margin-bottom: 0;
                padding-left: 25px;

                li {
                    color: #F2F3F4;
                    font-size: 16px;
                    font-weight: 400;
                    font-style: normal;
                    padding-bottom: 16px;
                    line-height: normal;
                    font-family: Poppins;

                    a {
                        color: #F2F3F4;
                    }
                }
            }
        }

        &_reviews {
            padding-top: 24px;

            @media screen and (max-width: 700px) {
                padding-top: 0px;
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
        }
    }
`