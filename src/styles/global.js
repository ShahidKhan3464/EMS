import styled from "styled-components";
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const lightGrey = '#FEFEFE'
export const mainColor = '#C29137'
export const normalGrey = '#DADBDC'
export const mainLinearGradient = `linear-gradient(239deg, #303030 55%, ${mainColor} 100%)`

export const FieldErrorMessage = styled.p`
    top: 100%;
    color: #EF4444;
    font-size: 10px;
    line-height: 14px;
    position: absolute;
    font-style: normal;
    font-family: Poppins;
`

export const PrimaryButton = styled.button`
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    display: flex;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    font-style: normal;
    border-radius: 6px;
    color: ${lightGrey};
    align-items: center;
    font-family: Poppins;
    letter-spacing: 0.1px;
    justify-content: center;
    background: ${mainColor};
`

export const StyledStatus = styled.span`
    font-size: 12px;
    font-weight: 500;
    line-height: 22px;
    padding: 7px 12px;
    font-style: normal;
    border-radius: 4px;
    font-family: Poppins;
    color: ${props => props.color};
    background: ${props => props.bg};
    
    @media screen and (max-width: 520px) {
        padding: 5px 8px;
    }
`

export const StyledVatCertificate = styled.div`
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

export const StyledMainHeading = styled.h2`
    font-size: 24px;
    font-weight: 600;
    line-height: 34px;
    font-style: normal;
    color: ${lightGrey};
    font-family: Poppins;
    letter-spacing: 0.091px;

    @media screen and (max-width: 520px) {
        font-size: 16px;
    }
`

export const StyledDetailContent = styled.div`
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
        margin-bottom: 30px;
        align-items: center;
        justify-content: space-between;

        @media screen and (max-width: 520px) {
            margin-bottom: 15px;
        }

        .btn-container {
            gap: 10px;
            display: flex;
            align-items: center;

            button {
                border: none;
                outline: none;
                color: #F9FAFB;
                font-size: 13px;
                cursor: pointer;
                font-weight: 500;
                line-height: 18px;
                font-style: normal;
                padding: 10px 16px;
                border-radius: 6px;
                font-family: Poppins;
                letter-spacing: -0.01px;
                background: ${mainColor};

                @media screen and (max-width: 520px) {
                    padding: 6px 10px;
                }
            }
        }
    }

    .profile {
        gap: 30px;
        display: flex;
        padding-left: 42px;
        border-radius: 6px;
        position: relative;
        padding-right: 10px;
        align-items: center;
        background: #303030;
        border: 0.5px solid ${mainColor};

        @media screen and (max-width: 850px) {
            gap: 0px;
            flex-wrap: wrap;
            padding-top: 15px;
            padding-left: 15px;
        }

        &::before {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            content: "";
            width: 112px;
            height: 100%;
            position: absolute;
            background: ${mainColor};

            @media screen and (max-width: 850px) {
                display: none;
            }
        }

        >div {
            gap: 12px;
            z-index: 2;
            display: flex;
            align-items: center;
            flex-direction: column;

            @media screen and (max-width: 520px) {
                z-index: 1;
            }

            span {
                font-size: 10px;
                padding: 3px 10px;
                line-height: 16px;
                border-radius: 100px;
            }

            .image {
                width: 140px;
                height: 140px;
                border-radius: 50%;
                border: 2px solid #000;

                @media screen and (max-width: 520px) {
                    width: 120px;
                    height: 120px;
                }

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: contain;
                }
            }
        }

        &_content {
            padding: 30px 0;
            
            @media screen and (max-width: 700px) {
                padding: 15px 0;
            }
            
            &_text {
                gap: 40px;
                display: flex;
                flex-wrap: wrap;

                @media screen and (max-width: 700px) {
                    gap: 20px;
                }

                &_box {
                    gap: 32px;
                    display: flex;
                    flex-direction: column;

                    @media screen and (max-width: 700px) {
                       gap: 16px;
                    }

                    &_pair {
                        gap: 4px;
                        display: flex;
                        flex-direction: column;

                        .view-btn {
                            padding: 0;
                            border: none;
                            outline: none;
                            font-size: 16px;
                            cursor: pointer;
                            display: inherit;
                            font-weight: 400;
                            line-height: 24px;
                            font-style: normal;
                            color: ${mainColor};
                            font-family: Poppins;
                            background: transparent;
                            text-decoration: underline;
                        }

                        h6 {
                            color: #B6B6B7;
                            font-size: 14px;
                            font-weight: 400;
                            line-height: 22px;
                            font-style: normal;
                            font-family: Poppins;

                            @media screen and (max-width: 520px) {
                                font-size: 12px;
                                line-height: 20px;
                            }
                        }

                        p {
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 24px;
                            font-style: normal;
                            font-family: Poppins;
                            color: ${normalGrey};

                            @media screen and (max-width: 520px) {
                                font-size: 14px;
                                line-height: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
`

export const StyledBookedServiceDetails = styled.div`
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
        margin-bottom: 24px;
        justify-content: flex-end;
        flex-direction: row-reverse;

        @media screen and (max-width: 520px) {
            margin-bottom: 8px;
        }

        button {
            padding: 0;
            border: none;
            outline: none;
            cursor: pointer;
            background: transparent;
        }
    }

    .details-content {
        border-radius: 6px;
        background: #303030;
        padding: 22px 16px 33px;
        box-shadow: 0px 0px 10px 1px #2C2C2C;

        @media screen and (max-width: 700px) {
            padding: 12px;
        }

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

        &_bookingId {
            padding-bottom: 17px;

            @media screen and (max-width: 700px) {
                padding-bottom: 12px;
            }

            p {
                font-size: 14px;
                font-weight: 500;
                line-height: 22px;
                font-style: normal;
                color: ${lightGrey};
                font-family: Poppins;

                span {
                    color: #DADBDC;
                }
            }
        }

        &_capacity {
            gap: 10px;
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 8px;
            align-items: center;
            justify-content: space-between;

            .location {
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

            .provider {
                gap: 8px;
                display: flex;
                align-items: center;

                .text {
                    gap: 8px;
                    display: flex;
                    align-items: center;
                    p {
                        color: #FDFDFD;
                        font-size: 14px;
                        cursor: pointer;
                        font-weight: 400;
                        line-height: 26px;
                        font-style: normal;
                        font-family: Poppins;
                        text-decoration-line: underline;
                    }

                    span {
                        font-size: 12px;
                        font-weight: 400;
                        line-height: 22px;
                        font-style: normal;
                        color: ${mainColor};
                        font-family: Poppins;
                    }
                }
            }
        }

        &_customer {
            gap: 8px;
            display: flex;
            padding-top: 8px;
            align-items: center;

            .text {
                gap: 8px;
                display: flex;
                align-items: center;
                
                p {
                    color: #FDFDFD;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: 400;
                    line-height: 26px;
                    font-style: normal;
                    font-family: Poppins;
                    text-decoration-line: underline;
                }

                span {
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 22px;
                    font-style: normal;
                    color: ${mainColor};
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
            flex-wrap: wrap;
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

        &_totalAmount {
            padding-top: 28px;

            @media screen and (max-width: 700px) {
                padding-top: 12px;
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
`

export const StyledLoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 150px);

    @media screen and (max-width: 520px) {
        height: auto;
        width: calc(100vw - 100px);
    }

    span {
        color: #DADBDC;
    }
`

export const StyledNoResultsFound = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 520px) {
        height: auto;
        width: calc(100vw - 100px);
    }

    .box {
        gap: 24px;
        display: flex;
        align-items: center;
        flex-direction: column;

        @media screen and (max-width: 520px) {
            gap: 6px;

            img {
                width: 110px;
                height: 110px;
            }
        }

        h3 {
            font-size: 20px;
            font-weight: 600;
            line-height: 34px;
            font-style: normal;
            color: ${normalGrey};
            font-family: Poppins;
            letter-spacing: 0.076px;

            @media screen and (max-width: 520px) {
                font-size: 16px;
            }
        }
    }
`

export const StyledTableCell = styled(TableCell)((props) => ({
    [`&.${tableCellClasses.head}`]: {
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '26px',
        fontStyle: 'normal',
        padding: '10px 16px',
        whiteSpace: 'nowrap',
        borderBottom: 'none',
        fontFamily: 'Poppins',
        '@media screen and (max-width: 520px)': {
            fontSize: '12px',
        }
    },
    [`&.${tableCellClasses.body}`]: {
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: '300',
        lineHeight: '26px',
        fontStyle: 'normal',
        padding: '7px 16px',
        whiteSpace: 'nowrap',
        fontFamily: 'Poppins',
        borderBottom: '4px solid #2C2C2C',
        '@media screen and (max-width: 520px)': {
            fontSize: '12px',
        }
    },
}))

export const StyledTableRow = styled(TableRow)(() => ({
    cursor: 'pointer',
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))