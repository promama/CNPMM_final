import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SettingsIcon from "@material-ui/icons/Settings";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import SellerLayout from "../../components/Layout/seller/SellerLayout";
import Account from "./pages/Account/Account";
import Books from "./pages/Books/Books";
import Orders from "./pages/Orders/Orders";
import Setting from "./pages/Setting/Setting";

const pages = [
    {
        title: "Tài khoản",
        href: "/seller/account",
        icon: <AccountBoxIcon />,
    },
    {
        title: "Sách của tôi",
        href: "/seller/books",
        icon: <MenuBookIcon />,
    },
    {
        title: "Cài đặt",
        href: "/seller/setting",
        icon: <SettingsIcon />,
    },
];

function Seller(props) {
    const match = useRouteMatch();
    return (
        <SellerLayout pages={pages}>
            <Switch>
                <Redirect exact from={match.url} to="/seller/account" />

                <Route
                    exact
                    path={`${match.url}/account`}
                    component={Account}
                />
                <Route exact path={`${match.url}/orders`} component={Orders} />
                <Route exact path={`${match.url}/books`} component={Books} />
                <Route
                    exact
                    path={`${match.url}/setting`}
                    component={Setting}
                />
            </Switch>
        </SellerLayout>
    );
}

export default Seller;
