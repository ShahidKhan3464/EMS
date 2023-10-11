import React from 'react';
import { Icons } from 'assets';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { StyledNoResultsFound } from 'styles/global';

const Index = ({ text }) => {

    return (
        <TableRow>
            <TableCell colSpan={8} align="center" sx={{ borderBottom: 'none' }}>
                <StyledNoResultsFound>
                    <div className='box'>
                        <img src={Icons.notFound} alt='no-result-found' />
                        <h3>{text}</h3>
                    </div>
                </StyledNoResultsFound>
            </TableCell>
        </TableRow>
    )
}

export default Index