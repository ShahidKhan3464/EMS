import styled from "styled-components";
import { lightGrey, mainColor } from "styles/global";

export const StyledSidebarContainer = styled.aside`
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    overflow: auto;
    position: fixed;
    min-height: 100vh;
    padding: 24px 16px;
    background: #2C2C2C;
    transition: left .3s ease,right .3s ease,bottom .3s ease,top .3s ease !important;
    box-shadow: 0px 0px 8px 0px rgba(117, 125, 141, 0.10);

    &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

    @media screen and (max-width: 991px) {
        z-index: 2;
        left: ${props => props.isSidebarVisible ? '0' : '-282px'};
    }
    
    @media screen and (max-width: 700px) {
        width: 200px;
        padding: 24px 12px;
        left: ${props => props.isSidebarVisible ? '0' : '-224px'};
    }

    .sidebarContainer_logo {
        gap: 6px;
        display: flex;
        padding: 0 24px;
        align-items: center;
        
        span {
            font-size: 20px;
            font-weight: 500;
            line-height: 24px;
            color: ${mainColor};
            font-family: Poppins;

            @media screen and (max-width: 700px) {
                font-size: 20px;
            }
        }
    }

    .sidebarContainer_menu {
        margin-top: 44px;

        ul {
            margin: 0;
            padding: 0;
            list-style-type: none;

            li {
                margin-bottom: 28px;

                .active {
                    background: ${mainColor};

                    .menu-text {
                        font-weight: 500;
                        color: ${lightGrey};
                    }
                }

                a {
                    gap: 8px;
                    height: 40px;
                    display: flex;
                    color: #C2C2C3;
                    border-radius: 6px;
                    padding-left: 24px;
                    align-items: center;
                    text-decoration: none;

                    span:first-child {
                        width: 24px;
                        height: 24px;

                        @media screen and (max-width: 700px) {
                            width: 20px;
                            height: 20px;
                        }
                    }

                    &:hover {
                        background: ${mainColor};

                        .menu-text {
                            color: ${lightGrey};
                        }
                    }

                    .menu-text {
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 24px;
                        font-style: normal;
                        font-family: Poppins;

                        @media screen and (max-width: 700px) {
                            font-size: 14px;
                        }
                    }
                }    
            }

            .accordion {
                padding: 0 24px;

                .MuiPaper-root {
                    box-shadow: none;
                    background: transparent;

                    .MuiButtonBase-root {
                        gap: 20px;
                        padding: 0;
                        min-height: 0px;
                        display: inline-flex;

                        .MuiAccordionSummary-content {
                            gap: 8px;
                            margin: 0;

                            .menu-text {
                                color: #C2C2C3;
                                font-size: 16px;
                                font-weight: 400;
                                line-height: 24px;
                                font-style: normal;
                                font-family: Poppins;
                            }
                        }

                        .MuiAccordionSummary-expandIconWrapper {
                            color: ${mainColor};
                        }
                    }

                    .MuiAccordionDetails-root {
                        gap: 10px;
                        display: flex;
                        padding: 12px 5px 0;
                        flex-direction: column;

                        .active {
                            font-weight: 500;
                            color: ${lightGrey};
                        }

                        a {
                            color: #C2C2C3;
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 24px;
                            font-style: normal;
                            font-family: Poppins;

                            &:hover {
                                color: ${lightGrey};
                            }
                        }
                    }
                }
            }

            .logout {
                gap: 8px;
                height: 40px;
                display: flex;
                cursor: pointer;
                padding-left: 24px;
                align-items: center;

                span:first-child {
                    width: 24px;
                    height: 24px;
                }

                &:hover {
                    border-radius: 6px;
                    background: ${mainColor};

                    .menu-text {
                        color: ${lightGrey};
                    }
                }

                .menu-text {
                    color: #C2C2C3;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 24px;
                    font-style: normal;
                    font-family: Poppins;
                }
            }
        }    
    }
`