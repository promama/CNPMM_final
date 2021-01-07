import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    TextField,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {},
}));

const Password = (props) => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        old: "",
        new: "",
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <form>
                <CardHeader subheader="Đổi mật khẩu" title="Mật khẩu" />
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        label="Mật khẩu cũ"
                        name="old"
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Mật khẩu mới"
                        name="new"
                        onChange={handleChange}
                        style={{ marginTop: "1rem" }}
                        type="password"
                        value={values.confirm}
                        variant="outlined"
                    />
                </CardContent>
                <Divider />
                <CardActions
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Button color="primary" variant="outlined">
                        Xác nhận
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

Password.propTypes = {
    className: PropTypes.string,
};

export default Password;
