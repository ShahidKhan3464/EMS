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

        &_form {
            form {
                gap: 32px;
                display: flex;
                margin-top: 24px;
                flex-direction: column;

                @media screen and (max-width: 520px) {
                    gap: 16px;
                    margin-top: 12px;
                }

                .field-control {
                    position: relative;
                    
                    .textarea {
                        .MuiInputBase-root {
                            height: 187px;
                            align-items: flex-start;

                            textarea {
                                padding-right: 10px;
                                height: 100% !important;
                                overflow: auto !important;

                                &::-webkit-scrollbar {
                                    width: 3px;
                                    height: 3px;
                                }

                                &::-webkit-scrollbar-thumb {
                                    border-radius: 10px;
                                    background: ${normalGrey};
                                }
                            }
                        }
                    }
                }

                .btn-container {
                    gap: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    button {
                        border: none;
                        outline: none;
                        font-size: 13px;
                        cursor: pointer;
                        font-weight: 500;
                        line-height: 18px;
                        padding: 10px 15px;
                        font-style: normal;
                        border-radius: 6px;
                        font-family: Poppins;
                        background: transparent;
                        letter-spacing: -0.01px;

                        @media screen and (max-width: 520px) {
                           width: 100%;
                        }
                    }

                    .cancel-btn {
                        color: ${mainColor};
                        border: 1px solid ${mainColor};
                    }

                    .control-btn {
                        color: #F9FAFB;
                        background: ${mainColor};
                    }

                    .disabled-btn {
                        color: #919292;
                        cursor: not-allowed;
                        background: #4C4C4C;
                    }
                }
            }
        }
    }
`