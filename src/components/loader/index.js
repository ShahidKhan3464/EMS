import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { StyledLoadingContainer } from 'styles/global';
import CircularProgress from '@mui/material/CircularProgress';

const Index = () => {

    return (
        <TableRow>
            <TableCell colSpan={8} align="center" sx={{ borderBottom: 'none' }}>
                <StyledLoadingContainer>
                    <CircularProgress />
                </StyledLoadingContainer>
            </TableCell>
        </TableRow>
    )
}

export default Index