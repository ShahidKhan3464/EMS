import styled from "styled-components";
import { mainColor } from "styles/global";
import TextField from '@mui/material/TextField';

export const StyledInputField = styled(TextField)((props) => ({
    '& label': {
        fontSize: '16px',
        lineHeight: '24px',
        fontStyle: 'normal',
        fontFamily: 'Poppins',
        letterSpacing: '0.5px',
        color: props.error ? `${mainColor} !important` : '#FDFDFD !important',
        '@media screen and (max-width: 475px)': {
            fontSize: '14px',
        }
    },
    '& label.Mui-focused': {
        fontStyle: 'normal',
        fontFamily: 'Poppins',
        color: props.error ? mainColor : '#FDFDFD',
    },
    '& .MuiOutlinedInput-input': {
        fontSize: '16px',
        color: '#FDFDFD',
        lineHeight: '24px',
        fontStyle: 'normal',
        letterSpacing: '0.5px',
        fontFamily: 'SF Pro Text',
        '@media screen and (max-width: 475px)': {
            fontSize: '14px',
        }
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '8px',
            border: props.error ? `1px solid #EF4444 !important` : `1px solid #79747E`,
        },
        '&:hover fieldset': {
            border: props.error ? `2px solid #EF4444 !important` : `1px solid #FDFDFD`,
        },
        '& fieldset legend': {
            width: props.width,
            '@media screen and (max-width: 475px)': {
                width: props.mbwidth,
            }
        },
        '&.Mui-focused fieldset': {
            border: props.error ? `1px solid #EF4444` : `2px solid #FDFDFD`,
        },
        '& :-webkit-autofill': {
            WebkitTextFillColor: '#FDFDFD',
            WebkitBoxShadow: "0 0 0 30px #303030 inset",
        }
    },
    '& .MuiOutlinedInput-input[type="number"]::-webkit-inner-spin-button, & .MuiOutlinedInput-input[type="number"]::-webkit-outer-spin-button': {
        margin: 0,
        '-webkit-appearance': 'none',
    },
    '& .MuiOutlinedInput-input[type="number"]': {
        inputMode: 'numeric',
        '-moz-appearance': 'textfield',
    },
}))