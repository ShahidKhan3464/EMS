import styled from "styled-components";
import { lightGrey, mainColor } from "styles/global";

export const StyledMainContent = styled.div`
    gap: 20px;
    display: flex;
    padding: 20px 24px;
    flex-direction: column;

    @media screen and (max-width: 700px) {
        padding: 20px 12px;
    }

    .graph-notifi {
        gap: 20px;
        display: flex;
        @media screen and (max-width: 1280px) {
            flex-wrap: wrap;
        }
    }

    .tables-container {
        gap: 20px;
        display: flex;

        @media screen and (max-width: 1280px) {
            flex-wrap: wrap;
        }

        .table {
            width: 100%;
            height: 100%;
            padding: 20px;
            overflow: auto;
            border-radius: 6px;
            background: #2C2C2C;
            box-shadow: 0px 0px 8px 0px rgba(117, 125, 141, 0.10);

            @media screen and (max-width: 520px) {
                padding: 12px;
            }

            &_header {
                gap: 10px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                margin-bottom: 16px;
                justify-content: space-between;

                @media screen and (max-width: 520px) {
                    margin-bottom: 12px;
                }

                button {
                    padding: 0;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: 500;
                    line-height: 18px;
                    font-style: normal;
                    color: ${mainColor};
                    font-family: Poppins;
                    background: transparent;
                    text-decoration: underline;
                }
            }
        }
    }
`

export const StyledCards = styled.div`
    gap: 20px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;

    @media screen and (max-width: 1280px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 900px) {
        grid-template-columns: 1fr;
    }

    .card {
        display: flex;
        cursor: pointer;
        padding: 14px 30px;
        border-radius: 6px;
        align-items: center;
        background: #2C2C2C;
        justify-content: space-between;
        box-shadow: 0px 0px 8px 0px rgba(117, 125, 141, 0.10);

        @media screen and (max-width: 520px) {
            padding: 12px;
        }

        &_detail {
            gap: 8px;
            display: flex;
            flex-direction: column;

            p {
                font-size: 26px;
                font-weight: 600;
                line-height: 39px;
                font-style: normal;
                color: ${lightGrey};
                font-family: Poppins;
            }

            h3 {
                color: #C2C2C3;
                font-size: 14px;
                font-weight: 500;
                line-height: 26px;
                font-style: normal;
                font-family: Poppins;
            }
        }

        &_icon {
            display: flex;
            align-items: center;
        }
    }
`

export const StyledGraph = styled.div`
    width: 100%;
    border-radius: 6px;
    background: #2C2C2C;

    .header {
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 29px;
        justify-content: space-between;

        @media screen and (max-width: 520px) {
            gap: 10px;
            padding: 8px;
            margin-bottom: 0px;
        }
    }
`

export const StyledNotifications = styled.div`
    width: 100%;
    padding: 20px;
    border-radius: 6px;
    background: #2C2C2C;
    box-shadow: 0px 0px 8px 0px rgba(117, 125, 141, 0.10);

    @media screen and (max-width: 520px) {
        padding: 12px;
    }

    .header {
        gap: 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        button {
            border: none;
            outline: none;
            font-size: 14px;
            cursor: pointer;
            font-weight: 500;
            line-height: 18px;
            font-style: normal;
            color: ${mainColor};
            font-family: Poppins;
            background: transparent;
            text-decoration: underline;
        }
    }

    .list {
        gap: 12px;
        display: flex;
        padding-top: 30px;
        flex-direction: column;

        @media screen and (max-width: 520px) {
            padding-top: 12px;
        }

        &_item {
            gap: 16px;
            display: flex;
            align-items: center;
            padding-bottom: 12px;
            border-bottom: 1px solid #404040;

            &_text {
                p {
                    color: #E1E1E1;
                    font-size: 14px;
                    font-weight: 300;
                    line-height: 20px;
                    font-style: normal;
                    font-family: Poppins;
                }
                
                .time {
                    color: #9D9D9D;
                    font-size: 11px;
                    line-height: 17px;
                    font-style: normal;
                    font-family: Poppins;
                }
            }
        }
    }
`

export const StyledHeading = styled.h3`
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 500;
    line-height: 26px;
    font-style: normal;
    font-family: Poppins;

    @media screen and (max-width: 520px) {
        font-size: 18px;
    }
`