import styled from "styled-components";
import { lightGrey, mainColor, normalGrey } from "styles/global";

export const StyledDialogContent = styled.div`
    .content {
        &_header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            h2 {
                font-size: 28px;
                font-weight: 500;
                line-height: 42px;
                font-style: normal;
                color: ${lightGrey};
                font-family: Poppins;
                letter-spacing: 0.106px;

                @media screen and (max-width: 475px) {
                    font-size: 22px;
                }

                @media screen and (max-width: 375px) {
                    font-size: 16px;
                }
            }
        }

        &_reason {
            overflow-y: auto;
            margin-top: 15px;
            padding-right: 10px;
            height: calc(100vh - 180px);

            &::-webkit-scrollbar {
                width: 3px;
                height: 3px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background: ${normalGrey};
            }

            p {
                font-size: 20px;
                font-weight: 500;
                line-height: 27px;
                font-style: normal;
                color: ${mainColor};
                font-family: Poppins;
                word-break: break-all;
                letter-spacing: 0.5px;

                span {
                    color: #FDFDFD;
                    font-size: 18px;
                    font-weight: 400;
                }
            }
        }
    }
`