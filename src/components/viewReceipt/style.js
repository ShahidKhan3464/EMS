import styled from "styled-components";
import { lightGrey, mainColor } from "styles/global";

export const StyledReceiptContent = styled.div`
    height: 100vh;
    background-color: #2C2C2C;

    .header {
        padding: 15px 50px;
        background: #514C42;

        @media screen and (max-width: 520px) {
            padding: 8px;
        }

        &_logo {
            gap: 6px;
            display: flex;
            align-items: center;

            span {
                font-size: 28px;
                font-weight: 500;
                line-height: 24px;
                color: ${mainColor};
                font-family: Poppins;

                @media screen and (max-width: 520px) {
                    font-size: 20px;
                }
            }
        }
    }

    .content {
        overflow-y: scroll;
        height: calc(100vh - 130px);

        &::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }
            
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: ${mainColor};
        }

        &_body {
            padding: 30px 50px;

            @media screen and (max-width: 520px) {
                padding: 15px 8px;
            }

            h3 {
                font-size: 28px;
                font-weight: 400;
                line-height: 34px;
                text-align: center;
                font-style: normal;
                color: ${lightGrey};
                font-family: Poppins;
                letter-spacing: 0.106px;

                @media screen and (max-width: 520px) {
                    font-size: 20px;
                    line-height: 25px;
                }
            }

            .amount {
                font-size: 40px;
                font-weight: 500;
                margin-top: 16px;
                line-height: 32px;
                text-align: center;
                font-style: normal;
                margin-bottom: 32px;
                color: ${mainColor};
                font-family: Poppins;
                letter-spacing: 0.5px;

                @media screen and (max-width: 520px) {
                    margin-top: 8px;
                    font-size: 28px;
                    line-height: 25px;
                    margin-bottom: 16px;
                }
            }

            &_trsc-history {
                &_date-time {
                    display: flex;
                    padding-top: 16px;
                    align-items: center;
                    justify-content: space-between;

                    span {
                        color: #C2C2C3;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 16px;
                        font-style: normal;
                        font-family: Poppins;
                        
                        @media screen and (max-width: 520px) {
                            font-size: 14px;
                            line-height: 12px;
                        }
                    }
                }

                &_detail, &_advancePayment {
                    gap: 40px;
                    display: flex;
                    padding: 32px 0;
                    flex-direction: column;
                    border-top: 1px solid ${mainColor};
                    border-bottom: 1px solid ${mainColor};

                    @media screen and (max-width: 520px) {
                        gap: 10px;
                        padding: 10px 0;
                    }

                    p {
                        gap: 50px;
                        display: grid;
                        align-items: center;
                        grid-template-columns: 1fr 1fr;
                    }

                    .key {
                        color: #C2C2C3;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 16px;
                        font-style: normal;
                        font-family: Poppins;
                        @media screen and (max-width: 520px) {
                            font-size: 12px;
                        }
                    }

                    .value {
                        color: #F2F3F4;
                        font-size: 22px;
                        font-weight: 400;
                        line-height: 20px;
                        font-style: normal;
                        font-family: Poppins;
                        @media screen and (max-width: 520px) {
                            font-size: 14px;
                        }
                    }
                }
            }
        }

        &_footer {
            margin-bottom: 24px;
            @media screen and (max-width: 520px) {
                margin-bottom: 12px;
            }

            p {
                color: #F2F3F4;
                font-size: 16px;
                font-weight: 400;
                line-height: 16px;
                font-style: normal;
                text-align: center;
                font-family: Poppins;
                
                @media screen and (max-width: 520px) {
                    font-size: 12px;
                }
            }
        }
    }
`