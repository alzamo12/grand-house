import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from "react-router"
import LoadingSpinner from '../components/shared/LoadingSpinner/LoadingSpinner'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <LoadingSpinner />

    if (user) return children

    return <Navigate to="/login" state={location.pathname} replace="true"></Navigate>

};

PrivateRoute.propTypes = {
    children: PropTypes.element,
}

export default PrivateRoute;