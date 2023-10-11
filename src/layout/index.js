import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { LayoutContainer } from './style';

const Index = ({ children }) => {
    const [width, setWidth] = useState(window.innerWidth)
    const [isSidebarVisible, setIsSidebarVisible] = useState(false)

    window.addEventListener("resize", function () {
        setWidth(window.innerWidth)
    })

    const handleOutsideClick = (e) => {
        const sidebar = document.getElementById("sider")
        if (e.target.alt === 'hamburger') {
            if (isSidebarVisible) return setIsSidebarVisible(false)
            setIsSidebarVisible(true)
        }
        else if (!sidebar.contains(e.target)) {
            setIsSidebarVisible(false)
        }
    }

    useEffect(() => {
        if (width < 991) {
            document.addEventListener("click", handleOutsideClick)
        }
        return () => document.removeEventListener("click", handleOutsideClick)
    }, [width])

    return (
        <LayoutContainer isSidebarVisible={isSidebarVisible}>
            <div>
                <Sidebar isSidebarVisible={isSidebarVisible} />
            </div>
            <div className="layout">
                <Navbar
                    isSidebarVisible={isSidebarVisible}
                    setIsSidebarVisible={setIsSidebarVisible}
                />
                {children}
            </div>
        </LayoutContainer>
    )
}

export default Index