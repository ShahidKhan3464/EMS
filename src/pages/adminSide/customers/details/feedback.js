import React from 'react';
import { Icons } from 'assets';
import { StyledFeedback } from './style';
import StarRating from 'components/starRating';

const Index = ({ data }) => {

    const getSender = (sender) => {
        const { firstName, lastName } = sender.profile
        return `${firstName} ${lastName}`
    }

    return (
        <StyledFeedback>
            <div className='top'>
                <h2 className='heading'>
                    Feedback
                </h2>
                <button
                    type='button'
                    style={{
                        cursor: data?.length === 0 ? 'not-allowed' : 'pointer'
                    }}
                >
                    View all
                </button>
            </div>
            <div>
                {data.map((item, index) => {
                    const name = getSender(item.sender)
                    return (
                        <div key={index} className='box'>
                            <div className='box_top'>
                                <div className='avatar'>
                                    <img src={Icons.rAvatar1} alt='rAvatar' />
                                </div>
                                <div className='reviews'>
                                    <span>{name}</span>
                                    <div className='stars'>
                                        <StarRating
                                            maxRating={5}
                                            rating={item.rating}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='box_message'>
                                <p>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </StyledFeedback>
    )
}

export default Index