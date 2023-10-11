import styled from "styled-components";
import { lightGrey } from "styles/global";

export const StyledCards = styled.div`
    gap: 20px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;

    @media screen and (max-width: 1280px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 520px) {
        margin-top: 12px;
        grid-template-columns: 1fr;
    }

    .card {
        display: flex;
        cursor: pointer;
        padding: 14px 30px;
        border-radius: 6px;
        align-items: center;
        background: #232323;
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
    margin-top: 20px;
    border-radius: 6px;
    margin-bottom: 20px;
    background: #232323;
    
    @media screen and (max-width: 520px) {
        margin-top: 15px;
        margin-bottom: 15px;
    }

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

        h3 {
            color: #FFFFFF;
            font-size: 20px;
            font-weight: 500;
            line-height: 26px;
            font-style: normal;
            font-family: Poppins;

            @media screen and (max-width: 520px) {
                font-size: 18px;
            }
        }
    }
`