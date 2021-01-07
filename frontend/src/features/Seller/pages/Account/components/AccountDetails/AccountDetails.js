import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import UpdateAccountForm from "./components/UpdateAccountForm";

const useStyles = makeStyles(() => ({
    root: {},
}));

const AccountDetails = (props) => {
    const { className, user } = props;

    const [openAlertUpdated, setOpenAlertUpdated] = useState(false);

    const classes = useStyles();

    return (
        <Card className={clsx(classes.root, className)}>
            <CardHeader
                subheader="Người dùng có thể cập nhật thông tin của mình"
                title="Thông tin khách hàng"
            />
            <Divider />
            <CardContent>
                <UpdateAccountForm
                    handleSubmit={props.handleSubmit}
                    user={user}
                />
            </CardContent>
            <Divider />
            <Snackbar
                open={openAlertUpdated}
                autoHideDuration={6000}
                onClose={() => setOpenAlertUpdated(false)}
            >
                <Alert
                    onClose={() => setOpenAlertUpdated(false)}
                    severity="success"
                >
                    Đã cập nhật thành công
                </Alert>
            </Snackbar>
        </Card>
    );
};

AccountDetails.propTypes = {
    className: PropTypes.string,
};

export default AccountDetails;
