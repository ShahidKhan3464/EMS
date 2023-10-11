import React, { useState } from 'react';
import MdNavbar from './mdNavbar';
import LgNavbar from './lgNavbar';

const Index = ({ isSidebarVisible, setIsSidebarVisible }) => {
    const [width, setWidth] = useState(window.innerWidth)

    window.addEventListener("resize", function () {
        setWidth(window.innerWidth)
    })

    if (width > 991) {
        return (
            <LgNavbar />
        )
    }

    else if (width <= 991) {
        return (
            <MdNavbar
                isSidebarVisible={isSidebarVisible}
                setIsSidebarVisible={setIsSidebarVisible}
            />
        )
    }
}

export default Index