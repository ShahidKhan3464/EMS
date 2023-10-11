import React from 'react';
import Cards from './cards';
import Graph from './graph';
import LayoutContent from 'layout';
import Transactions from './transaction';
import { StyledMainHeading } from 'styles/global';

const Index = () => {

    return (
        <LayoutContent>
            <div className='content'>
                <div className='content_header'>
                    <StyledMainHeading>Earnings</StyledMainHeading>
                </div>
                <Cards />
                <Graph />
                <Transactions />
            </div>
        </LayoutContent>
    )
}

export default Index