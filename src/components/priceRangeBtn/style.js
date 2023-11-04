import styled from 'styled-components';
import Button from '@mui/material/Button';
import { lightGrey } from 'styles/global';

export const StyledButton = styled(Button)(({ selected }) => ({
    fontStyle: 'normal',
    fontSize: '13px !important',
    fontWeight: '500 !important',
    lineHeight: '18px !important',
    borderRadius: '6px !important',
    padding: '10px 16px !important',
    fontFamily: 'Poppins !important',
    textTransform: 'none !important',
    letterSpacing: '-0.01px !important',
    border: `1px solid ${selected ? lightGrey : ' #919292'} !important`,
    '@media screen and (max-width: 520px)': {
        fontSize: '11px !important',
        padding: '6px 10px !important',
    }
}))