import React from 'react';
import { StyledInputField } from './style';

const Index = ({ width, mbwidth, label, shrink, field, autoComplete, type, error, placeholder = '', multiline = false }) => {

    return (
        <StyledInputField
            fullWidth
            {...field}
            type={type}
            width={width}
            label={label}
            error={error}
            mbwidth={mbwidth}
            variant="outlined"
            multiline={multiline}
            placeholder={placeholder}
            autoComplete={autoComplete}
            InputLabelProps={{ shrink }}
        />
    )
}

export default Index