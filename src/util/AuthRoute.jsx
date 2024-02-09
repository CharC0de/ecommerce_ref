import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function AuthRoute({ children }) {
    let authData = useSelector(state => state.auth)
    let location = useLocation()
    console.log(authData)
    if (!authData.isAuthenticated) {
        return <Navigate to='/dashboard' state={{ from: location }} replace />
    }
    return children
}
AuthRoute.propTypes = {
    children: PropTypes.node.isRequired,
};