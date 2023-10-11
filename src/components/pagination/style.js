import { Icons } from "assets";
import styled from "styled-components";
import { mainColor } from "styles/global";

export const StyledPaginationContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-top: 14px;
    align-items: center;
    justify-content: space-between;
    
    @media screen and (max-width: 520px) {
        gap: 20px;
        justify-content: center;
    }
    
    .left {
        gap: 8px;
        display: flex;
        align-items: center;

        span {
            font-size: 12px;
            font-weight: 400;
            font-style: normal;
            color: ${mainColor};
            font-family: Poppins;
        }

        select {
            width: 56px;
            padding: 10px;
            outline: none;
            color: #FDFDFD;
            cursor: pointer;
            font-size: 12px;
            appearance: none;
            font-weight: 400;
            font-style: normal;
            border-radius: 8px;
            font-family: Poppins;
            background-color: #6D6D6E;
            background-repeat: no-repeat;
            background-position: 65% center;
            background-image: url(${Icons.selectArrow});
        }
    }

    .MuiPagination-root {
        li {
            button {
                border: none;
                color: #FDFDFD;
                font-size: 14px;
                font-weight: 600;
                line-height: 22px;
                font-style: normal;
                border-radius: 2px;
                background: #6D6D6E;
                font-family: Poppins;

                @media screen and (max-width: 520px) {
                    font-weight: 500;
                }
            }

            .Mui-selected {
                color: #FFFFFF;
                background: ${mainColor};
            }
        }   
    }
`