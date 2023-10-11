import { Images } from "assets";
import styled from "styled-components";
import { lightGrey, normalGrey, mainLinearGradient, mainColor } from "styles/global";

export const StyledAuthBox = styled.div`
    display: flex;
    padding-top: 10px;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 10px);
    background: ${mainLinearGradient};

    .content {
        gap: 126px;
        display: flex;
        align-items: center;
        justify-content: center;

        @media screen and (max-width: 950px) {
            gap: 50px;
        }

        @media screen and (max-width: 768px) {
            gap: 30px;
        }

        @media screen and (max-width: 620px) {
            flex-wrap: wrap;
            padding-bottom: 10px;
        }

        &_bg-img {
            gap: 50px;
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 100px 86px 60px;
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url(${Images.emsBg});

            @media screen and (max-width: 950px) {
                padding: 50px 60px 60px;
            }

            @media screen and (max-width: 725px) {
                padding: 50px 35px 60px;
            }

            @media screen and (max-width: 600px) {
                padding: 20px 60px 60px
            }

            .logo {
                gap: 6px;
                display: flex;
                align-items: center;

                .logo-text {
                    font-size: 28px;
                    font-weight: 500;
                    line-height: 24px; 
                    font-style: normal;
                    color: ${mainColor};
                    font-family: Poppins;

                    @media screen and (max-width: 850px) {
                        font-size: 22px;
                    }
                }
            }

            .vector-img {
                width: 100%;
                max-width: 300px;

                @media screen and (max-width: 600px) {
                    max-width: 280px;
                }

                img {
                    width: 100%;
                }
            }
        }

        &_children {
            width: 100%;
            display: flex;
            max-width: 402px;
            flex-direction: column;
            justify-content: center;

            .text {
                gap: 8px;
                display: flex;
                flex-direction: column;

                h3 {
                    font-size: 26px;
                    font-weight: 600;
                    line-height: 34px;
                    color: ${lightGrey};
                    font-family: Poppins;
                    letter-spacing: 0.099px;
                }

                p {
                    font-size: 14px;
                    line-height: 21px;
                    color: ${normalGrey};
                    font-family: Poppins;
                    letter-spacing: -0.05px;
                }
            }

            .form-container {
                margin-top: 8px;

                .field-control {
                    margin-top: 20px;
                    position: relative;
                }

                .forgot-password {
                    text-align: end;
                    margin-top: 12px;

                    a {
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 117%;
                        color: ${mainColor};
                        font-family: Poppins;
                    }
                }
            }

            .btn-container {
                margin-top: 40px;
                
                @media screen and (max-width: 475px) {
                    margin-top: 25px;
                }

                .bottom-btn {
                    width: auto;
                    margin: auto;
                    display: block;
                    margin-top: 24px;
                    color: ${mainColor};
                    background: transparent;

                    @media screen and (max-width: 475px) {
                        margin-top: 10px;
                    }
                }
            }
        }
    }
`