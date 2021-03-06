import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {},
    row: {
        height: "42px",
        display: "flex",
        alignItems: "center",
    },
    spacer: {
        flexGrow: 1,
    },
    importButton: {
        marginRight: theme.spacing(1),
    },
    exportButton: {
        marginRight: theme.spacing(1),
    },
    searchInput: {
        marginRight: theme.spacing(1),
    },
}));

const UsersToolbar = (props) => {
    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <div className={classes.row}>
                {/* <SearchInput
                    className={classes.searchInput}
                    placeholder="Search user"
                /> */}
            </div>
        </div>
    );
};

UsersToolbar.propTypes = {
    className: PropTypes.string,
};

export default UsersToolbar;
