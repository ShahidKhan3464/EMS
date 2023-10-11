import React from 'react';
import { Icons } from 'assets';
import { StyledTableSearchField } from './style';

const Index = ({ value, handleSearchQueryChange }) => {

    return (
        <StyledTableSearchField>
            <div className='field'>
                <img src={Icons.search} alt='input-search' />
                <input
                    type='text'
                    value={value}
                    placeholder='Search'
                    onChange={(e) => handleSearchQueryChange(e.target.value)}
                />
            </div>
        </StyledTableSearchField>
    )
}

export default Index