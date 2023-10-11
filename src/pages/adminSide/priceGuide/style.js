import styled from "styled-components";
import { lightGrey, mainColor } from "styles/global";

export const StyledListOfCategories = styled.div`
    padding-top: 24px;
    
    @media screen and (max-width: 520px) {
        padding-top: 0px;
    }

    .list {
        gap: 20px;
        display: flex;
        flex-direction: column;

        @media screen and (max-width: 520px) {
            gap: 10px;
        }

        .title {
            font-size: 18px;
            font-weight: 500;
            line-height: 34px;
            font-style: normal;
            padding-bottom: 6px;
            color: ${lightGrey};
            font-family: Poppins;
            letter-spacing: 0.068px;

            @media screen and (max-width: 520px) {
                font-size: 14px;
                padding-bottom: 0;
            }
        }

        .edit-btn {
            padding: 0;
            border: none;
            outline: none;
            cursor: pointer;
            background: transparent;
        }
    }
`

export const StyledPriceGuideForm = styled.div`
    padding-top: 10px;

    @media screen and (max-width: 520px) {
        padding-top: 0px;
    }

    form {
        gap: 32px;
        display: grid;
        grid-template-columns: 1fr;

        .field-control {
            gap: 10px;
            display: flex;
            position: relative;
            align-items: center;
            justify-content: space-between;

            @media screen and (max-width: 520px) {
                padding-top: 0px;
                align-items: baseline;
                flex-direction: column;
            }

            p {
                top: 100%;
                left: 60%;
                color: #EF4444;
                font-size: 10px;
                padding-top: 4px;
                line-height: 14px;
                position: absolute;
                font-style: normal;
                font-family: Poppins;
            }

            .MuiSvgIcon-root {
                color: #919292;
            }

            label {
                font-size: 16px;
                font-weight: 400;
                line-height: 24px;
                font-style: normal;
                font-family: Poppins;
            }

            input {
                outline: none;
                color: #919292;
                font-size: 16px;
                font-weight: 400;
                padding: 8px 16px;
                line-height: 24px;
                border-radius: 6px;
                font-style: normal;
                font-family: Poppins;
                letter-spacing: 0.5px;
                background: transparent;
                border: 2px solid #919292;

                @media screen and (max-width: 520px) {
                    padding: 8px 7px;
                }
            }

            .disabled-label {
                color: #6D6D6E;
            }

            .disabled-field {
                color: #555;
                cursor: not-allowed;
                border: 2px solid #555555;
            }

            .enabled-label {
                color: #F2F3F4;
            }          
        }

        .btn-container {
            gap: 8px;
            display: flex;
            flex-wrap: wrap;
            padding-top: 8px;
            justify-content: flex-end;

            button {
                outline: none;
                font-size: 13px;
                cursor: pointer;
                font-weight: 500;
                line-height: 132%;
                border-radius: 6px;
                font-style: normal;
                font-family: Poppins;
            }

            .cancel-btn {
                width: 79px;
                height: 40px;
                color: ${mainColor};
                background: transparent;
                border: 1px solid ${mainColor};
            }

            .save-btn {
                width: 125px;
                height: 40px;
                border: none;
                color: #FFFFFF;
                background: ${mainColor};
            }
        }
    }
`