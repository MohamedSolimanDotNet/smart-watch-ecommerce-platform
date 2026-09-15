import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';


const Layout = ({ children, hideLayout } : any) => {
    if (hideLayout) {
        return <>{children}</>;
    }

    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
