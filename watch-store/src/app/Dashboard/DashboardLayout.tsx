import React from 'react';
import DashboardSidebar from '../components/DashboardSidebar/DashboardSidebar';



const DashboardLayout = ({ children, hideLayout } : any) => {
    if (hideLayout) {
        return <>{children}</>;
    }

    return (
        <div style={{display: "flex", minHeight: "100vh"}}>
            <DashboardSidebar />
            {children}
        </div>
    );
};

export default DashboardLayout;