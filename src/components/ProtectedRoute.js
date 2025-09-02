import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import Header from './Header';
import Footer from './Footer';

const ProtectedRoute = ({ children, requireAdmin = false, allowedPermissions = [] }) => {
    const { user, loading, isAdmin, hasPermission } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <>
                <Header />
                <div className="content-container">
                    <div className="text-center py-20">
                        <div className="text-xl mb-4">Checking authentication...</div>
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Check admin requirement
    if (requireAdmin && !isAdmin()) {
        return (
            <>
                <Header />
                <div className="content-container">
                    <div className="text-center py-20">
                        <div className="text-xl mb-4 text-red-600">Access Denied</div>
                        <div className="text-gray-600">You need admin privileges to access this page.</div>
                        <button 
                            onClick={() => window.history.back()}
                            className="btn-green mt-4 px-6 py-2 rounded-md"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // Check specific permissions if provided
    if (allowedPermissions.length > 0 && !allowedPermissions.some(permission => hasPermission(permission))) {
        return (
            <>
                <Header />
                <div className="content-container">
                    <div className="text-center py-20">
                        <div className="text-xl mb-4 text-red-600">Insufficient Permissions</div>
                        <div className="text-gray-600">You don't have the required permissions to access this page.</div>
                        <button 
                            onClick={() => window.history.back()}
                            className="btn-green mt-4 px-6 py-2 rounded-md"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // Render the protected content
    return children;
};

export default ProtectedRoute;