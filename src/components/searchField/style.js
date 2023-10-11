import styled from "styled-components";

export const StyledTableSearchField = styled.div`
    .field {
        gap: 8px;
        height: 40px;
        display: flex;
        border-radius: 6px;
        padding-left: 16px;
        padding-right: 16px;
        align-items: center;
        border: 1px solid #C2C2C3;
        flex-direction: row-reverse;

        @media screen and (max-width: 520px) {
            height: 36px;
            padding-left: 12px;
            padding-right: 12px;
        }

        input {
            padding: 0;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            color: #C2C2C3;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            font-style: normal;
            font-family: Poppins;
            background: transparent;

            @media screen and (max-width: 520px) {
                font-size: 12px;
            }

            &::placeholder {
                color: #C2C2C3;
                font-size: 16px;
                font-weight: 400;
                line-height: 24px;
                font-style: normal;
                font-family: Poppins;

                @media screen and (max-width: 520px) {
                    font-size: 12px;
                }
            }
        }
    }
`