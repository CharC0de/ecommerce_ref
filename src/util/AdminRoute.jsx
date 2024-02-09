import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function AdminRoute({ children }) {
    let authData = useSelector(state => state.auth)
    let location = useLocation()
    console.log(authData)
    if (authData.userData.privelege != 'admin') {
        return <Navigate to='/dashboard' state={{ from: location }} replace />
    }
    return children
}
AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};