import React from "react";
import { Icons } from "assets";
import { StyledStarsRating } from './style';

const Index = ({ rating, maxRating }) => {

    if (typeof rating === 'undefined') {
        return null
    }

    const starElements = Array(maxRating).fill(null).map((_, i) => (
        <img
            key={i}
            alt={i < Math.floor(rating) ? 'star' : 'no-star'}
            src={i < Math.floor(rating) ? Icons.star : Icons.noStar}
        />
    ))

    return (
        <StyledStarsRating>
            {starElements}
        </StyledStarsRating>
    )
}

export default Index