import { ThemeProvider } from "@material-ui/styles";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/Common/PrivateRoute";
import theme from "../theme";
import "./App.scss";

const User = React.lazy(() => import("../features/User"));
const Admin = React.lazy(() => import("../features/Admin"));
const NotFound = React.lazy(() => import("../components/NotFound"));
const Home = React.lazy(() => import("../features/Home"));

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Suspense fallback={<div>Loading</div>}>
                <BrowserRouter>
                    <Switch>
                        <PrivateRoute component={Admin} path="/admin" />
                        <Route component={User} path="/user" />
                        <Route component={Home} path="/" exact />
                        <Route component={NotFound} path="*" exact />
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
