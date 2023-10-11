import styled from "styled-components";
import { mainColor } from "styles/global";

export const LayoutContainer = styled.div`
    display: grid;
    background: #303030;
    grid-template-columns: 280px calc(100% - 280px);

    @media screen and (max-width: 991px) {
        grid-template-columns: ${props => props.isSidebarVisible ? '280px calc(100% - 280px)' : '100%'};
    }
    
    @media screen and (max-width: 700px) {
        grid-template-columns: ${props => props.isSidebarVisible ? '230px calc(100% - 230px)' : '100%'};
    }

    @media screen and (max-width: 520px) {
        /* grid-template-columns: ${props => props.isSidebarVisible ? '280px calc(100% - 280px)' : '100%'}; */
        grid-template-columns: ${props => props.isSidebarVisible ? '230px' : '100%'};
    }

    .layout {
        min-height: 100vh;

        .content {
            padding: 20px;
            margin: 20px 24px;
            border-radius: 6px;
            background: #2C2C2C;
            @media screen and (max-width: 700px) {
                padding: 12px;
                margin: 20px 12px;
            }

            &_header {
                gap: 10px;
                display: flex;
                margin-bottom: 24px;
                justify-content: space-between;

                @media screen and (max-width: 520px) {
                    margin-bottom: 0px;
                }

                button {
                    padding: 0;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    background: transparent;
                }
            }

            &_control-elements {
                gap: 12px;
                display: flex;
                flex-wrap: wrap;
                margin-top: 24px;
                margin-bottom: 24px;
                justify-content: space-between;

                @media screen and (max-width: 520px) {
                    margin-top: 12px;
                    margin-bottom: 12px;
                }

                &_filterbox {
                    gap: 16px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    
                    @media screen and (max-width: 520px) {
                        gap: 8px;
                    }
                }

                .reset-filter {
                    border: none;
                    outline: none;
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 18px; 
                    font-style: normal;
                    color: ${mainColor};
                    font-family: Poppins;
                    letter-spacing: -0.01px;
                    background: transparent;
                    text-decoration-line: underline;
                }
            }

            &_tabsPanel {
                .indicator-border {
                    background:  ${mainColor};
                }

                @media screen and (max-width: 520px) {
                    .MuiTabs-root  {
                        min-height: 35px;
                    }
                }  

                .MuiTabs-scroller {
                    overflow: auto !important;

                    .MuiTabs-flexContainer {
                        gap: 40px;
                        
                        @media screen and (max-width: 520px) {
                            gap: 20px;
                        }   

                        .Mui-selected {
                            font-weight: 400;
                            color: ${mainColor};
                        }

                        button {
                            padding: 0;
                            color: #B6B6B7;
                            font-size: 14px;
                            font-weight: 400;
                            line-height: 22px;
                            font-style: normal;
                            font-family: Poppins;
                            text-transform: inherit;
                            
                            @media screen and (max-width: 520px) {
                                font-size: 12px;
                                min-height: 30px;
                            }                       
                        }
                    }
                }
            }
        }
    }
`