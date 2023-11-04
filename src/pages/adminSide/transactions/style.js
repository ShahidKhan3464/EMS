import { Icons } from "assets";
import styled from "styled-components";
import { lightGrey, mainColor } from "styles/global";

export const StyledExportButton = styled.button`
    gap: 8px;
    padding: 0;
    border: none;
    outline: none;
    display: flex;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    font-style: normal;
    color: ${mainColor};
    align-items: center;
    font-family: Poppins;
    background: transparent;
    letter-spacing: -0.05px;
`

export const StyledDatepickerContainer = styled.div`
    .react-datepicker-wrapper {
        .react-datepicker__input-container  {
            input {
                height: 40px;
                outline: none;
                padding: 0 12px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                line-height: 18px;
                border-radius: 6px;
                font-style: normal;
                font-family: Poppins;
                letter-spacing: -0.01px;
                background-position-x: 75%;
                background-repeat: no-repeat;
                background-color: transparent;
                background-position-y: center;
                width: ${props => props.selectDate ? '90px' : '58px'};
                color: ${props => props.selectDate ? lightGrey : '#919292'};
                border: 1px solid ${props => props.selectDate ? lightGrey : '#919292'};
                background-image: ${props => props.selectDate ? `none` : `url(${Icons.downArrow})`};

                ::placeholder {
                    color: #919292;
                }

                @media screen and (max-width: 520px) {
                    height: 35px;
                    font-size: 11px;
                }
            }

            .react-datepicker__close-icon {
                &::after {
                    padding: 0;
                    color: #919292;
                    font-size: 20px;
                    background: transparent;
                }
            }
        }
    }
`