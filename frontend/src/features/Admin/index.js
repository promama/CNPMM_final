import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import AdminLayout from "../../components/Layout/admin/AdminLayout";
import Books from "../Admin/Books/Books"

export default function Admin(props) {
    const match = useRouteMatch();
    return (
        <AdminLayout>
            <Switch>
                <Redirect exact from={match.url} to="/admin/books" />

                <Route
                    exact
                    path={`${match.url}/books`}
                    component={Books}
                />
            </Switch>
        </AdminLayout>
    );
}
