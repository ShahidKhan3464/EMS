import React from 'react';
import { Icons } from 'assets';
import { StyledButton } from './style';
import { lightGrey } from 'styles/global';

const Index = ({ priceRange, setPriceRange, clicked }) => {

    return (
        <StyledButton
            onClick={clicked}
            sx={{ color: !priceRange ? '#919292' : lightGrey }}
            endIcon={!priceRange
                ? (
                    <img
                        alt='down-arrow'
                        src={Icons.downArrow}
                    />
                )
                : (
                    <img
                        alt='clear-filter'
                        src={Icons.clearFilter}
                        onClick={(e) => {
                            setPriceRange()
                            e.stopPropagation()
                        }}
                    />
                )
            }
        >
            {priceRange ? `${priceRange.from} - ${priceRange.to}` : 'Price Range'}
        </StyledButton>
    )
}

export default Index