import styled from "styled-components";
import { lightGrey, mainColor, normalGrey } from "styles/global";

export const StyledMainContent = styled.div`
    gap: 20px;
    display: flex;
    padding: 24px 16px;

    @media screen and (max-width: 700px) {
        padding: 20px 12px;
    }

    .settings {
        width: 100%;
        padding: 20px;
        border-radius: 6px;
        position: relative;
        background: #2C2C2C;

        @media screen and (max-width: 700px) {
            padding: 12px;
        }

        @media screen and (max-width: 520px) {
            padding: 12px 0 60px;
        }

        .btn-container {
            right: 0;
            top: 20px;
            gap: 16px;
            display: flex;
            position: absolute;
            align-items: center;

            @media screen and (max-width: 520px) {
                left: 0;
                top: auto;
                bottom: 16px;
            }

            button {
                height: 40px;
                border: none;
                outline: none;
                font-size: 13px;
                cursor: pointer;
                font-weight: 500;
                line-height: 18px;
                font-style: normal;
                border-radius: 6px;
                font-family: Poppins;
                background: transparent;
                letter-spacing: -0.01px;

                @media screen and (max-width: 520px) {
                    width: 100% !important;
                }
            }

            .cancel-btn {
                width: 79px;
                color: ${mainColor};
                border: 1px solid ${mainColor};
            }
        }

        &_content {
            gap: 24px;
            display: flex;
            margin-top: 35px;

            @media screen and (max-width: 991px) {
                flex-wrap: wrap;
            }

            @media screen and (max-width: 520px) {
                margin-top: 12px;
            }

            &_tabs {
                gap: 18px;
                width: 100%;
                display: flex;
                max-width: 265px;
                flex-direction: column;

                @media screen and (max-width: 991px) {
                    max-width: 100%;
                }

                .activeTab {
                    border-radius: 6px;
                    border-left: 2px solid ${mainColor};

                    svg path {
                        fill: ${mainColor};
                    }

                    span {
                        color: ${mainColor};
                    }
                }

                button {
                    gap: 12px;
                    border: none;
                    height: 49px;
                    display: flex;
                    outline: none;
                    cursor: pointer;
                    padding: 0 24px;
                    border-radius: 6px;
                    align-items: center;
                    background: #333334;

                    span {
                        font-size: 14px;
                        font-weight: 400;
                        font-style: normal;
                        line-height: 121.4%;
                        font-family: Poppins;
                        color: ${normalGrey};
                    }
                }
            }

            &_tabsPanel {
                width: 100%;
            }
        }
    }
`

export const StyledGeneral = styled.div`
    h2 {
        font-size: 22px;
        font-weight: 600;
        line-height: 28px;
        font-style: normal;
        color: ${lightGrey};
        margin-bottom: 16px;
        font-family: SF Pro Text;                    
        letter-spacing: -0.057px;
    }

    form {
        gap: 24px;
        display: flex;
        flex-direction: column;

        .field-control {
            position: relative;
        }

        .disabled-field {
            gap: 16px;
            display: grid;
            grid-template-columns: 1fr 100px;

            @media screen and (max-width: 520px) {
                gap: 6px;
                padding-bottom: 15px;
            }

            .update-email-btn {
                padding: 0;
                border: none;
                outline: none;
                cursor: pointer;
                font-size: 12px;
                font-weight: 500;
                line-height: 18px;
                font-style: normal;
                color: ${mainColor};
                font-family: Poppins;        
                background: transparent;
                letter-spacing: -0.01px;
            }
        }

        .new-confirm_password {
            gap: 19px;
            display: flex;
            align-items: center;
            padding-bottom: 20px;

            @media screen and (max-width: 991px) {
                flex-wrap: wrap;
            }

            .match-password {
                width: 100%;
                position: relative;
            }
        }

        .upload__image-wrapper {
            gap: 16px;
            display: flex;
            height: 144px;
            padding-left: 28px;
            border-radius: 6px;
            background: #303030;
            align-items: center;
            justify-content: flex-end;
            flex-direction: row-reverse;

            @media screen and (max-width: 520px) {
                padding-left: 18px;
            }

            &::before {
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
                content: "";
                width: 81px;
                height: 100%;
                position: absolute;
                background: ${mainColor};

                @media screen and (max-width: 520px) {
                    width: 60px;
                }
            }

            button {
                border: none;
                outline: none;
                color: #F9FAFB;
                font-size: 13px;
                cursor: pointer;
                font-weight: 500;
                line-height: 18px;
                padding: 11px 16px;
                font-style: normal;
                border-radius: 6px;
                font-family: Poppins;       
                letter-spacing: -0.01px;
                background: ${mainColor};
            }

            .upload-image {
                z-index: 2;
                width: 104px;
                display: flex;
                height: 104px;
                border-radius: 50%;
                align-items: center;
                background: #4C4C4C;
                border: 2px solid #000;
                justify-content: center;

                span {
                    color: #FFFFFF;
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 24px;
                    font-style: normal;
                    font-family: Poppins;
                }
            }

            .image-item {
                gap: 25px;
                left: 28px;
                z-index: 2;
                border-radius: 50%;
                display: flex;
                align-items: center;

                @media screen and (max-width: 520px) {
                    gap: 12px;
                }

                .image-shown {
                    width: 104px;
                    height: 104px;
                    border-radius: 50%;

                    @media screen and (max-width: 375px) {
                        height: 80px;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }

                .image-item__btn-wrapper {
                    gap: 16px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;

                    button:last-child {
                        color: ${mainColor};
                        background: transparent;
                        border: 1px solid ${mainColor};
                    }
                }
            }
        }
    }
`

export const StyledEmailUpdate = styled.div`
    width: 100%;
    padding-bottom: 10px;

    form {
        gap: 24px;
        display: flex;
        flex-direction: column;

        .update-btn {
            padding: 0;
            height: 40px;
            display: flex;
            border: none;
            outline: none;
            color: #F9FAFB;
            font-size: 13px;
            cursor: pointer;
            font-weight: 500;
            line-height: 18px;
            border-radius: 8px;
            font-style: normal;
            align-items: center;
            font-family: Poppins;
            letter-spacing: -0.01px;
            justify-content: center;
            background: ${mainColor};
        }
    }
`