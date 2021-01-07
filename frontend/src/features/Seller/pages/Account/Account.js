import { Grid, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { updateUser } from "../../../../actions/user";
import userApi from "../../../../api/userApi";
import AccountDetails from "./components/AccountDetails/AccountDetails";
import AccountProfile from "./components/AccountProfile/AccountProfile";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}));

const Account = (props) => {
    const dispatch = useDispatch();
    const store = useStore();
    const classes = useStyles();

    const [openAlert, setOpenAlert] = useState(false);

    let user = { ...store.getState().user.login.user };

    function handleSubmit(values) {
        (async () => {
            try {
                const response = await userApi.update(values);
                let action = await updateUser(response);
                console.log(action);
                let resDispatch = dispatch(action);
                if (resDispatch.payload.success) {
                    setOpenAlert(true);
                }
            } catch (error) {
                console.log(`failed post update account as ${error}`);
            }
        })();
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item lg={4} md={6} xl={4} xs={12}>
                    <AccountProfile user={user} />
                </Grid>
                <Grid item lg={8} md={6} xl={8} xs={12}>
                    <AccountDetails user={user} handleSubmit={handleSubmit} />
                </Grid>
            </Grid>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={() => setOpenAlert(false)}
            >
                <Alert onClose={() => setOpenAlert(false)} severity="success">
                    Đã cập nhật thông tin thành công.
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Account;
