import styled from "styled-components";
import { mainLinearGradient } from "styles/global";

export const StyledPageNotFound = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background: ${mainLinearGradient};

    .content {
        gap: 20px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
`