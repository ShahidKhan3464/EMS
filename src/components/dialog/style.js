import styled from "styled-components";
import { lightGrey, mainColor, normalGrey } from "styles/global";

export const StyledDialogContent = styled.div`
    display: flex;
    margin-top: 76px;
    align-items: center;
    flex-direction: column;

    @media screen and (max-width: 425px) {
        margin-top: 50px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .icon {
        width: 80px;
        height: 80px;

        @media screen and (max-width: 425px) {
            width: 50px;
            height: 50px;
        }
    }

    h3 {
        font-size: 28px;
        font-weight: 500;
        line-height: 34px;
        font-style: normal;
        text-align: center;
        color: ${lightGrey};
        font-family: Poppins;
        letter-spacing: 0.106px;
    }

    .text {
        width: 100%;
        max-width: 376px;
        margin-top: 15px;
        margin-bottom: 40px;

        @media screen and (max-width: 520px) {
            margin-bottom: 20px;
        }

        p {
            font-size: 18px;
            margin-top: 12px;
            font-weight: 400;
            line-height: 132%;
            font-style: normal;
            text-align: center;
            color: ${normalGrey};
            font-family: Poppins;
        }
    }

    .btn-container {
        gap: 16px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        button {
            width: 179px;
            height: 46px;
            outline: none;
            font-size: 14px;
            cursor: pointer;
            font-weight: 500;
            line-height: 132%;
            border-radius: 6px;
            font-style: normal;
            font-family: Poppins;
        }

        .cancel-btn {
            color: ${mainColor};
            background: transparent;
            border: 1px solid ${mainColor};
        }

        .control-btn {
            border: none;
            color: #FFFFFF;
            background: ${mainColor};
        }
    }
`