import styled from 'styled-components';
import { mainColor } from 'styles/global';

export const StyledPriceRangeContent = styled.div`
    top: 50%;
    left: 50%;
    width: 100%;
    padding: 16px;
    max-width: 328px;
    position: absolute;
    border-radius: 4px;
    background: #303030;
    transform: translate(-30%, 20%);
    box-shadow: 0px 0px 8px 0px rgba(117, 125, 141, 0.10);

    @media screen and (max-width: 520px) {
        left: 38%;
        max-width: 200px;
        transform: translate(-50%, 10%);
    }

    .title {
        color: #F2F3F4;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        line-height: normal;
        margin-bottom: 10px;
        font-family: Poppins;
    }

    .flex-wrap {
        gap: 10px;
        display: flex;
        align-items: center;
        
        @media screen and (max-width: 768px) {
            flex-wrap: wrap;
        }

        .field-control {
            position: relative;
        }
    }

    .btn-container {
        gap: 16px;
        display: flex;
        padding-top: 30px;
        flex-direction: row-reverse;

        @media screen and (max-width: 520px) {
            flex-direction: row;
        }

        button {
            width: 94px;
        }

        .cancel-btn {
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            border-radius: 6px;
            font-style: normal;
            color: ${mainColor};
            font-family: Poppins;
            letter-spacing: 0.1px;
            background: transparent;
            border: 1px solid ${mainColor};
        }
    }
`