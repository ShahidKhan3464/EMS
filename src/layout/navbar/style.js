import styled from "styled-components";
import { mainColor } from "styles/global";

export const StyledLgNavbar = styled.div`
    display: flex;
    padding: 22px 24px;
    align-items: center;
    background: #2C2C2C;
    justify-content: flex-end;
    border-bottom: 0.5px solid #2C2C33;
    box-shadow: 0px 0px 8px 0px rgba(117, 125, 141, 0.10);

    .right {
        gap: 20px;
        display: flex;
        align-items: center;

        .bell-icon {
            padding: 0;
            border: none;
            outline: none;
            cursor: pointer;
            background: transparent;
        }

        .logo {
            width: 32px;
            height: 32px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }
    }
`

export const StyledMdNavbar = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 24px 0;
    justify-content: space-between;

    @media screen and (max-width: 700px) {
        padding: 20px 12px 0;
    }

    .hamburger-btn {
        border: none;
        padding: 8px;
        outline: none;
        cursor: pointer;
        border-radius: 50%;
        background: #454545;
        
        @media screen and (max-width: 520px) {
            padding: 4px;
        }
    }

    .logo-text {
        span {
            font-size: 28px;
            font-weight: 500;
            line-height: 24px;
            color: ${mainColor};
            font-family: Poppins;

            @media screen and (max-width: 700px) {
                font-size: 20px;
            }
        }
    }

    .right {
        gap: 20px;
        display: flex;
        align-items: center;

        .bell-icon {
            padding: 0;
            border: none;
            outline: none;
            cursor: pointer;
            background: transparent;
        }

        .logo {
            width: 32px;
            height: 32px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }
    }
`