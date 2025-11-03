import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Use the new context hook
const AdminRoute = ({ element }) => {
    const { user, role, loading } = useAuth();
    // If loading, show nothing or a spinner (handled by AuthProvider, but safe check here)
    if (loading) {
        return null;
    }
    // 1. If not logged in, redirect to home/login page
    if (!user) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    // 2. If logged in but not an admin, show access denied
    if (role !== 'ADMIN') {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-8 bg-gray-50", children: _jsxs("div", { className: "text-center p-10 bg-white rounded-lg shadow-xl border-t-4 border-red-500", children: [_jsx("h1", { className: "text-4xl font-bold text-red-600 mb-4", children: "\uD83D\uDEAB Access Denied" }), _jsx("p", { className: "text-lg text-gray-700", children: "You do not have administrative privileges to view this page." })] }) }));
    }
    // 3. If logged in AND is an admin, render the component
    return element;
};
export default AdminRoute;
