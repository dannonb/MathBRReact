import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isAuth } from '../../utils/auth'

const ProtectedRoute = ({ component }) => {
    return (
        <Route
            render={(props) => isAuth() === true ? (
                <>
                    {React.createElement(component, props)}
                </>
            ) : (
                <Redirect to="/auth" />
            )}
        />
    )
}

export default ProtectedRoute