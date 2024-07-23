import React, { ReactNode } from 'react';

import Navbar from "../components/layout/navbar/navbar";
import Footer from "../components/layout/footer/footer";
import SubNavbar from "../components/layout/subNavbar/subNavbar";

interface LayoutProps {
    children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar/>
            <div className="mx-[10%] min-h-[40vh]">
                {children}
            </div>
            <Footer/>
        </>
    );
};
export default Layout;