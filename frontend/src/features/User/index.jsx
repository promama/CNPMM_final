import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import GuestLayout from '../../components/Layout/guest/GuestLayout.js'
import './index.scss'

function User(props) {
    const match = useRouteMatch();
    return (
        <GuestLayout>
            <Switch>
                <Route exact from={`${match.url}/login`} component={LoginPage} />
                <Route exact path={`${match.url}/register`} component={RegisterPage} />
            </Switch>
        </GuestLayout>
    )
}

User.propTypes = {}

export default User

